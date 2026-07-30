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
        };
        if (!response.ok || !result.submissionId) {
          throw new Error(result.error ?? "Submission gagal.");
        }
        setSubmissionId(result.submissionId);
      } catch {
        setSubmitError(
          "Jawaban belum berhasil disimpan. Periksa koneksi dan coba lagi.",
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
              <strong>Hanya 0,7% kandidat yang lolos.</strong> Kumpulan studi kasus
              nyata yang saya gunakan untuk hiring Specialist, Manager, Head, dan
              VP Marketing. Semua kasus sudah pernah saya selesaikan sendiri—saya
              menggunakan standar yang sama untuk mengukur kandidat.
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

            <div className="data-block">
              <p className="eyebrow">DATA YANG TERSEDIA</p>
              <ul>
                {payload.case.data.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
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
                ? "Menyimpan jawaban…"
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
          <h1>Selesai.</h1>
          <p>
            Anda sudah menjawab {Object.keys(answers).length} kasus. Tidak ada
            skor instan—jawaban yang kuat dinilai dari diagnosis, kualitas
            keputusan, dan kemampuan melihat trade-off.
          </p>
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
