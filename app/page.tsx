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
    name: "The Specialist Track",
    level: "Specialist",
    description: "Mengukur ketajaman membaca data dan mengambil keputusan taktis.",
  },
  {
    id: "manager",
    number: "02",
    name: "The Manager Track",
    level: "Manager",
    description: "Menguji kemampuan mengelola trade-off, tim, dan sistem kerja.",
  },
  {
    id: "head",
    number: "03",
    name: "The Leadership Track",
    level: "Head, VP & C-level",
    description: "Menguji judgment bisnis, alokasi sumber daya, dan operating altitude.",
  },
];

export default function Home() {
  const [payload, setPayload] = useState<Payload | null>(null);
  const [choice, setChoice] = useState("");
  const [writing, setWriting] = useState("");
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  async function loadCase(track: TrackId, index: number) {
    setLoading(true);
    const response = await fetch(`/api/case?track=${track}&index=${index}`);
    const nextPayload = (await response.json()) as Payload;
    setPayload(nextPayload);
    setChoice("");
    setWriting("");
    setLoading(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function saveAndContinue() {
    if (!payload) return;
    const value = payload.case.answer.type === "choice" ? choice : writing.trim();
    setAnswers((current) => ({ ...current, [payload.case.id]: value }));

    if (payload.index + 1 >= payload.total) {
      setComplete(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    loadCase(payload.track.id, payload.index + 1);
  }

  function reset() {
    setPayload(null);
    setComplete(false);
    setChoice("");
    setWriting("");
    setAnswers({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const canContinue =
    payload?.case.answer.type === "choice"
      ? Boolean(choice)
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
              Kumpulan studi kasus nyata yang saya gunakan untuk hiring level Head,
              VP, dan C-level Marketing. Sejauh ini, secara statistik hanya 0,7%
              kandidat yang lolos.
            </p>
            <p className="intro-copy">
              Semua kasus sudah pernah saya selesaikan sendiri. Artinya, saya
              menggunakan standar yang sama untuk mengukur kandidat. Silakan coba
              untuk melihat seberapa jauh kemampuan Anda.
            </p>
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
                  <small>{track.level}</small>
                  <strong>{track.name}</strong>
                  <span>{track.description}</span>
                </span>
                <span className="arrow">→</span>
              </button>
            ))}
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
                    className={`choice ${choice === option ? "selected" : ""}`}
                    key={option}
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={option}
                      checked={choice === option}
                      onChange={() => setChoice(option)}
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
              disabled={!canContinue || loading}
              onClick={saveAndContinue}
            >
              {payload.index + 1 === payload.total
                ? "Selesaikan jalur"
                : "Lanjut ke kasus berikutnya"}
              <span>→</span>
            </button>
          </section>
        </div>
      )}

      {complete && payload && (
        <section className="complete">
          <p className="eyebrow">{payload.track.name.toUpperCase()}</p>
          <h1>Selesai.</h1>
          <p>
            Anda sudah menjawab {Object.keys(answers).length + 1} kasus. Tidak ada
            skor instan—jawaban yang kuat dinilai dari diagnosis, kualitas
            keputusan, dan kemampuan melihat trade-off.
          </p>
          <button className="continue" onClick={reset}>
            Pilih jalur lain <span>→</span>
          </button>
        </section>
      )}
    </main>
  );
}
