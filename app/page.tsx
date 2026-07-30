"use client";

import { useState } from "react";

type TrackId = "specialist" | "manager" | "head";
type CaseAnswer =
  | { type: "choice"; options: string[] }
  | { type: "write"; placeholder: string };

type CaseData = {
  id: string;
  title: string;
  brief: string;
  data: string[];
  question: string;
  answer: CaseAnswer;
};

type Payload = {
  track: { id: TrackId; name: string; level: string };
  case: CaseData;
  index: number;
  total: number;
};

type AssessmentResult = {
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

const tracks: {
  id: TrackId;
  number: string;
  name: string;
  level: string;
  description: string;
}[] = [
  {
    id: "specialist",
    number: "01",
    name: "Specialist",
    level: "7 kasus",
    description: "Fokus pada ads, conversion, creative, dan psikologi marketing.",
  },
  {
    id: "manager",
    number: "02",
    name: "Manager",
    level: "5 kasus",
    description: "Menguji kemampuan mengelola trade-off, tim, dan sistem kerja.",
  },
  {
    id: "head",
    number: "03",
    name: "Head & VP",
    level: "6 kasus",
    description: "Menguji judgment bisnis, alokasi sumber daya, dan operating altitude.",
  },
];

export default function Home() {
  const [payload, setPayload] = useState<Payload | null>(null);
  const [choice, setChoice] = useState<number | null>(null);
  const [writing, setWriting] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submissionId, setSubmissionId] = useState("");
  const [assessmentResult, setAssessmentResult] =
    useState<AssessmentResult | null>(null);
  const [scoringUnavailable, setScoringUnavailable] = useState(false);
  const [complete, setComplete] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  async function loadCase(track: TrackId, index: number) {
    setLoading(true);
    const response = await fetch(`/api/case?track=${track}&index=${index}`);
    const nextPayload = (await response.json()) as Payload;
    setPayload(nextPayload);
    setChoice(null);
    setWriting("");
    setLoading(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function saveAndContinue() {
    if (!payload) return;
    const value =
      payload.case.answer.type === "choice" ? String(choice) : writing.trim();
    const nextAnswers = { ...answers, [payload.case.id]: value };
    setAnswers(nextAnswers);

    if (payload.index + 1 >= payload.total) {
      setSubmitting(true);
      setSubmitError("");
      try {
        const response = await fetch("/api/submissions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            track: payload.track.id,
            answers: nextAnswers,
          }),
        });
        const result = (await response.json()) as {
          submissionId?: string;
          error?: string;
          result?: AssessmentResult | null;
          scoringUnavailable?: boolean;
        };
        if (!response.ok || !result.submissionId) {
          throw new Error(result.error ?? "Submission gagal.");
        }
        setSubmissionId(result.submissionId);
        setAssessmentResult(result.result ?? null);
        setScoringUnavailable(Boolean(result.scoringUnavailable));
      } catch (err) {
        setSubmitError(
          err instanceof Error && err.message
            ? err.message
            : "Jawaban belum berhasil disimpan. Periksa koneksi dan coba lagi.",
        );
        setSubmitting(false);
        return;
      }
      setSubmitting(false);
      setComplete(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    loadCase(payload.track.id, payload.index + 1);
  }

  function reset() {
    setPayload(null);
    setComplete(false);
    setChoice(null);
    setWriting("");
    setAnswers({});
    setSubmissionId("");
    setAssessmentResult(null);
    setScoringUnavailable(false);
    setSubmitError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const canContinue =
    payload?.case.answer.type === "choice"
      ? choice !== null
      : writing.trim().length >= 40;

  return (
    <main>
      <header className="site-header">
        <button className="brand" onClick={reset}>THE CMO TEST</button>
        <span>by Aditya Bayu</span>
      </header>

      {!payload && !complete && (
        <section className="landing">
          <div className="landing-copy">
            <p className="eyebrow">MARKETING LEADERSHIP ASSESSMENT</p>
            <h1>The CMO Test</h1>
            <p className="byline">by Aditya Bayu</p>
            <p className="intro-copy">
              Test ini merupakan study case yang saya buat dari real cases yang
              sudah saya solve selama 12 tahun, dan saya gunakan untuk mencari
              qualified candidate. I&apos;ll be honest: nggak semua orang bisa
              menjawabnya sampai selesai. Saya menggunakan standard saya sendiri—
              terlebih untuk level VP/Head, kandidat minimal harus on par agar bisa
              jadi discussion partner. <strong>97% FAILED THE TEST.</strong> You&apos;ve
              been warned. I have quite a high standard :) Dan buat saya, ini bare
              minimum.
            </p>
            <div className="assessment-facts" aria-label="Informasi assessment">
              <span>4–6 ROLE CASES</span>
              <span>1 FINAL CASE</span>
              <span>EVIDENCE-BASED</span>
            </div>
          </div>

          <div className="track-zone">
            <div className="tracks-head">
              <h2>Pilih level assessment</h2>
              <span>Pilih dengan jujur</span>
            </div>
            <div className="track-list" aria-label="Pilih jalur ujian">
              {tracks.map((track) => (
                <button
                  className="track"
                  key={track.id}
                  onClick={() => loadCase(track.id, 0)}
                  disabled={loading}
                >
                  <span className="track-number">{track.number}</span>
                  <span className="track-copy">
                    <strong>{track.name}</strong>
                    <span>{track.description}</span>
                  </span>
                  <span className="track-count">{track.level}</span>
                  <span className="arrow">→</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {payload && !complete && (
        <div className="test-shell">
          <div className="progress-row">
            <span>{payload.track.name}</span>
            <span>Kasus {payload.index + 1} / {payload.total}</span>
          </div>
          <div className="progress" aria-hidden="true">
            <span style={{ width: `${((payload.index + 1) / payload.total) * 100}%` }} />
          </div>

          <section className="reading-panel">
            <div className="case-meta">
              <span>{payload.case.id}</span>
              <span>{payload.track.level}</span>
            </div>
            <h1>{payload.case.title}</h1>
            <p className="brief">{payload.case.brief}</p>

            {payload.case.data.length > 0 && (
              <div className="data-block">
                <p className="eyebrow">DATA YANG TERSEDIA</p>
                <ul>
                  {payload.case.data.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          <section className="response-panel">
            <p className="eyebrow">PERTANYAAN</p>
            <h2>{payload.case.question}</h2>

            {payload.case.answer.type === "choice" ? (
              <div className="choices">
                {payload.case.answer.options.map((option, index) => (
                  <label
                    className={`choice ${choice === index ? "selected" : ""}`}
                    key={option}
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={index}
                      checked={choice === index}
                      onChange={() => setChoice(index)}
                    />
                    <span>{String.fromCharCode(65 + index)}</span>
                    <p>{option}</p>
                  </label>
                ))}
              </div>
            ) : (
              <div className="writing">
                <textarea
                  aria-label="Jawaban Anda"
                  value={writing}
                  onChange={(event) => setWriting(event.target.value)}
                  placeholder={payload.case.answer.placeholder}
                />
                <span>{writing.length} karakter</span>
              </div>
            )}

            <button
              className="continue"
              disabled={!canContinue || loading || submitting}
              onClick={saveAndContinue}
            >
              {submitting
                ? "Menilai jawaban…"
                : payload.index + 1 === payload.total
                  ? "Selesaikan jalur"
                  : "Lanjut ke kasus berikutnya"}
              <span>→</span>
            </button>
            {submitError && (
              <p className="submit-error" role="alert">{submitError}</p>
            )}
          </section>
        </div>
      )}

      {complete && payload && (
        <section className="complete">
          <p className="eyebrow">{payload.track.name.toUpperCase()}</p>
          {assessmentResult ? (
            <>
              <div className="result-head">
                <div>
                  <p className="eyebrow">OPERATING ALTITUDE</p>
                  <h1>{assessmentResult.totalScore}<span>/100</span></h1>
                </div>
                <p className="result-band">{assessmentResult.classification}</p>
              </div>
              <p className="result-summary">{assessmentResult.summary}</p>

              <div className="result-signals">
                <article>
                  <p className="eyebrow">STRONGEST SIGNAL</p>
                  <p>{assessmentResult.strongestSignal}</p>
                </article>
                <article>
                  <p className="eyebrow">FOCUS AREA</p>
                  <p>{assessmentResult.focusArea}</p>
                </article>
              </div>

              {assessmentResult.multipleChoiceMaxScore > 0 && (
                <p className="mc-score">
                  Multiple choice: <strong>{assessmentResult.multipleChoiceScore} / {assessmentResult.multipleChoiceMaxScore}</strong>
                </p>
              )}

              <div className="result-cases">
                <p className="eyebrow">CASE BREAKDOWN</p>
                {assessmentResult.cases.map((caseResult) => (
                  <article className="result-case" key={caseResult.id}>
                    <div className="result-case-top">
                      <span>{caseResult.id}</span>
                      <strong>{caseResult.score} / {caseResult.maxScore}</strong>
                    </div>
                    <h2>{caseResult.title}</h2>
                    <p><b>Yang sudah terlihat:</b> {caseResult.strength}</p>
                    <p><b>Yang perlu diasah:</b> {caseResult.gap}</p>
                  </article>
                ))}
              </div>

              {assessmentResult.criticalMisses > 0 && (
                <p className="critical-note">
                  Ada critical miss yang terdeteksi, sehingga skor akhir dibatasi di 69.
                </p>
              )}
            </>
          ) : (
            <>
              <h1>Selesai.</h1>
              <p>
                Anda sudah menjawab {Object.keys(answers).length} kasus. Skor
                otomatis untuk jawaban tertulis belum tersedia saat ini.
              </p>
              {scoringUnavailable && (
                <p className="scoring-note">
                  Evaluator AI belum dikonfigurasi. Submission Anda tetap tersimpan
                  dan dapat direview dengan rubric yang sama.
                </p>
              )}
            </>
          )}
          {submissionId && (
            <p className="submission-reference">
              Referensi submission: <strong>{submissionId}</strong>
            </p>
          )}
          <button className="continue" onClick={reset}>
            Pilih jalur lain <span>→</span>
          </button>
        </section>
      )}
    </main>
  );
}
