import { assessmentSubmissions } from "@/db/schema";
import {
  multipleChoiceScoreMaps,
  scoringVersion,
  type TrackId,
} from "@/lib/scoring";
import { evaluateAssessment } from "@/lib/ai-evaluator";

const expectedCases: Record<TrackId, string[]> = {
  specialist: ["S2", "S3", "S5", "S9", "S10", "S11", "F1"],
  manager: ["M2", "M3", "M4", "M8", "F1"],
  head: ["H1", "H2", "H3", "H4", "H7", "F1"],
};

type SubmissionPayload = {
  track?: TrackId;
  answers?: Record<string, string>;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as SubmissionPayload;
    if (!payload.track || !expectedCases[payload.track] || !payload.answers) {
      return Response.json({ error: "Submission tidak valid." }, { status: 400 });
    }

    const caseIds = expectedCases[payload.track];
    const cleanAnswers: Record<string, string> = {};

    for (const caseId of caseIds) {
      const answer = payload.answers[caseId]?.trim();
      if (!answer || answer.length > 10_000) {
        return Response.json(
          { error: `Jawaban ${caseId} belum lengkap atau terlalu panjang.` },
          { status: 400 },
        );
      }
      cleanAnswers[caseId] = answer;
    }

    let multipleChoicePoints = 0;
    let multipleChoiceMaxPoints = 0;

    for (const [caseId, scoreMap] of Object.entries(multipleChoiceScoreMaps)) {
      if (!caseIds.includes(caseId)) continue;
      const optionIndex = Number(cleanAnswers[caseId]);
      if (!Number.isInteger(optionIndex) || scoreMap[optionIndex] === undefined) {
        return Response.json(
          { error: `Pilihan jawaban ${caseId} tidak valid.` },
          { status: 400 },
        );
      }
      multipleChoicePoints += scoreMap[optionIndex];
      multipleChoiceMaxPoints += 4;
    }

    let assessmentResult = null;
    let scoringUnavailable = false;

    try {
      assessmentResult = await evaluateAssessment({
        track: payload.track,
        answers: cleanAnswers,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      if (message !== "AI_SCORING_NOT_CONFIGURED") {
        console.error("assessment_ai_scoring_failed", { message });
      }
      scoringUnavailable = true;
    }

    const id = crypto.randomUUID();
    const { getDb } = await import("@/db");
    const db = getDb();
    await db.insert(assessmentSubmissions).values({
      id,
      track: payload.track,
      answers: JSON.stringify(cleanAnswers),
      multipleChoicePoints,
      multipleChoiceMaxPoints,
      status: assessmentResult ? "scored" : "pending_review",
      scoringVersion,
      reviewerScores: assessmentResult ? JSON.stringify(assessmentResult) : null,
      criticalMisses: assessmentResult?.criticalMisses ?? 0,
      operatingIndex: assessmentResult?.totalScore ?? null,
      classification: assessmentResult?.classification ?? null,
    });

    return Response.json(
      {
        submissionId: id,
        status: assessmentResult ? "scored" : "pending_review",
        result: assessmentResult,
        scoringUnavailable,
      },
      { status: 201 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    console.error("assessment_submission_failed", { message });
    return Response.json(
      { error: "Jawaban belum dapat disimpan. Silakan coba kembali." },
      { status: 500 },
    );
  }
}
