import {
  classificationBands,
  multipleChoiceScoreMaps,
  scoringVersion,
  type TrackId,
  writtenRubrics,
} from "@/lib/scoring";

export type WrittenReview = {
  caseId: string;
  score: number;
  strength: string;
  gap: string;
  criticalMiss: boolean;
};

export type AssessmentResult = {
  scoringVersion: string;
  totalScore: number;
  rawScore: number;
  classification: string;
  summary: string;
  strongestSignal: string;
  focusArea: string;
  criticalMisses: number;
  multipleChoiceScore: number;
  multipleChoiceMaxScore: number;
  cases: Array<{
    id: string;
    title: string;
    score: number;
    maxScore: number;
    strength: string;
    gap: string;
  }>;
};

export const trackCaseWeights: Record<TrackId, Record<string, number>> = {
  specialist: {
    S2: 10,
    S3: 10,
    S5: 17,
    S9: 16,
    S10: 16,
    S11: 16,
    F1: 15,
  },
  manager: {
    M2: 22,
    M3: 20,
    M4: 23,
    M8: 20,
    F1: 15,
  },
  head: {
    H1: 17,
    H2: 17,
    H3: 18,
    H4: 17,
    H7: 16,
    F1: 15,
  },
};

export const activeCaseContext: Record<
  string,
  { title: string; task: string }
> = {
  S5: {
    title: "Google Ads: Landing Page Drop",
    task: "Buat hipotesis, urutan tindakan, dan bukti yang dapat mengubah keputusan saat landing-page conversion turun walau CTR/CPC membaik.",
  },
  S9: {
    title: "The Conversion Rate Trap",
    task: "Putuskan apakah diskon 25% yang menaikkan conversion rate tetapi menurunkan AOV, margin, dan repeat purchase benar-benar menang.",
  },
  S10: {
    title: "The Lead Magnet That Attracts Everyone",
    task: "Rancang lead magnet dan journey 14 hari agar download generik berubah menjadi qualified conversation enterprise.",
  },
  S11: {
    title: "Urgency Without Trust",
    task: "Nilai false scarcity yang meningkatkan CTR tetapi menurunkan trust, lalu rancang eksperimen pengganti.",
  },
  M2: {
    title: "Budget Allocation Across Branches",
    task: "Alokasikan 100 unit budget pada lima cabang dengan economics, capacity, dan market potential berbeda.",
  },
  M3: {
    title: "Sales–Marketing Definition War",
    task: "Tentukan keputusan rapat dan perubahan 30 hari untuk menyelesaikan konflik MQL, SLA, dan attribution antara Sales dan Marketing.",
  },
  M4: {
    title: "The Rp15 Million Funnel",
    task: "Rancang funnel 30 hari menuju qualified conversation dengan budget Rp15 juta, owned audience, dan kapasitas sales terbatas.",
  },
  M8: {
    title: "Thirty-Day Turnaround",
    task: "Ambil keputusan 72 jam dan perbarui diagnosis ketika qualified leads pulih pada hari ke-10 tetapi sales tetap datar.",
  },
  H1: {
    title: "The Expensive Lead Board Problem",
    task: "Berikan respons board terhadap permintaan penurunan CPL 50% saat economics, capacity, dan incrementality belum bersih.",
  },
  H2: {
    title: "Revenue Growth or Getting Bigger?",
    task: "Putuskan kesiapan fundraising dan tiga intervensi 90 hari saat revenue naik tetapi margin, cash, dan governance memburuk.",
  },
  H3: {
    title: "The Impossible Revenue Target",
    task: "Pilih pertanyaan berinformation gain tinggi dan growth bet sementara sebelum menyetujui target revenue board.",
  },
  H4: {
    title: "AI Search Visibility Without Content Spam",
    task: "Beri memo 90 hari terhadap permintaan 500 artikel AI dan hubungkan content system dengan qualified demand.",
  },
  H7: {
    title: "Organization Design Under Growth",
    task: "Pilih perubahan organisasi, decision rights, dan stop-doing saat target naik tanpa penambahan headcount.",
  },
  F1: {
    title: "The School Bus",
    task: "Jelaskan cara mengetahui volume ruang kosong di dalam bus sekolah secara kreatif dan tetap practical.",
  },
};

const multipleChoiceFeedback: Record<string, string> = {
  S2: "Nilai penuh membutuhkan pembacaan objective campaign sebelum menilai headline metric.",
  S3: "Nilai penuh menggunakan cost per sale dan marginal scaling, bukan CTR atau CPL semata.",
};

function findClassification(score: number) {
  return (
    classificationBands.find((band) => score >= band.min)?.label ??
    classificationBands.at(-1)!.label
  );
}

function rounded(value: number) {
  return Math.round(value * 10) / 10;
}

export function buildAssessmentResult(input: {
  track: TrackId;
  answers: Record<string, string>;
  writtenReviews: WrittenReview[];
  summary: string;
  strongestSignal: string;
  focusArea: string;
}): AssessmentResult {
  const weights = trackCaseWeights[input.track];
  const reviewByCase = new Map(
    input.writtenReviews.map((review) => [review.caseId, review]),
  );
  const cases: AssessmentResult["cases"] = [];
  let rawScore = 0;
  let multipleChoiceScore = 0;
  let multipleChoiceMaxScore = 0;
  let criticalMisses = 0;

  for (const [caseId, maxScore] of Object.entries(weights)) {
    const scoreMap = multipleChoiceScoreMaps[caseId];
    const context = activeCaseContext[caseId];

    if (scoreMap) {
      const selectedIndex = Number(input.answers[caseId]);
      const rating = scoreMap[selectedIndex] ?? 0;
      const score = rounded((rating / 4) * maxScore);
      rawScore += score;
      multipleChoiceScore += score;
      multipleChoiceMaxScore += maxScore;
      cases.push({
        id: caseId,
        title: context?.title ?? caseId,
        score,
        maxScore,
        strength:
          rating === 4
            ? "Pilihan Anda menggunakan framing yang paling kuat untuk kasus ini."
            : "Pilihan Anda memiliki sebagian signal, tetapi belum mencapai framing terbaik.",
        gap: multipleChoiceFeedback[caseId] ?? "Periksa kembali trade-off utama dalam kasus ini.",
      });
      continue;
    }

    const review = reviewByCase.get(caseId);
    const rating = Math.min(Math.max(review?.score ?? 0, 0), 4);
    const score = rounded((rating / 4) * maxScore);
    rawScore += score;
    if (review?.criticalMiss) criticalMisses += 1;
    cases.push({
      id: caseId,
      title: context?.title ?? caseId,
      score,
      maxScore,
      strength: review?.strength ?? "Jawaban belum dapat dievaluasi.",
      gap: review?.gap ?? "Jawaban belum dapat dievaluasi.",
    });
  }

  const roundedRawScore = Math.round(rawScore);
  const totalScore = criticalMisses > 0 ? Math.min(roundedRawScore, 69) : roundedRawScore;

  return {
    scoringVersion,
    totalScore,
    rawScore: roundedRawScore,
    classification: findClassification(totalScore),
    summary: input.summary,
    strongestSignal: input.strongestSignal,
    focusArea: input.focusArea,
    criticalMisses,
    multipleChoiceScore: rounded(multipleChoiceScore),
    multipleChoiceMaxScore,
    cases,
  };
}

export function getWrittenEvaluationInput(
  track: TrackId,
  answers: Record<string, string>,
) {
  return Object.keys(trackCaseWeights[track])
    .filter((caseId) => !multipleChoiceScoreMaps[caseId])
    .map((caseId) => {
      const rubric = writtenRubrics[caseId as keyof typeof writtenRubrics];
      const context = activeCaseContext[caseId];
      return {
        caseId,
        title: context.title,
        task: context.task,
        answer: answers[caseId],
        highSignals: rubric.highSignals,
        criticalMisses: rubric.criticalMisses,
      };
    });
}
