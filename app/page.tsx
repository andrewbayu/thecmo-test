"use client";

import { useState } from "react";

type CaseFile = {
  id: string;
  title: string;
  category: string;
};

type CaseData = {
  id: string;
  title: string;
  level: string;
  brief: string;
  question: string;
  credits: number;
  files: CaseFile[];
};

type OpenedFile = CaseFile & { content: string };
type Stage = "intro" | "case" | "shock" | "complete";

export default function Home() {
  const [stage, setStage] = useState<Stage>("intro");
  const [caseData, setCaseData] = useState<CaseData | null>(null);
  const [openedFiles, setOpenedFiles] = useState<OpenedFile[]>([]);
  const [activeFile, setActiveFile] = useState<OpenedFile | null>(null);
  const [answer, setAnswer] = useState("");
  const [shock, setShock] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [loadingFile, setLoadingFile] = useState<string | null>(null);

  async function startCase() {
    const response = await fetch("/api/case");
    const payload = await response.json();
    setCaseData(payload.case);
    setStage("case");
  }

  async function openFile(file: CaseFile) {
    const existing = openedFiles.find((item) => item.id === file.id);
    if (existing) {
      setActiveFile(existing);
      return;
    }
    if (!caseData || openedFiles.length >= caseData.credits) return;

    setLoadingFile(file.id);
    const response = await fetch("/api/case", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "open_file", fileId: file.id }),
    });
    const payload = await response.json();
    const opened = { ...file, content: payload.content };
    setOpenedFiles((current) => [...current, opened]);
    setActiveFile(opened);
    setLoadingFile(null);
  }

  async function submitAnswer() {
    const response = await fetch("/api/case", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "submit" }),
    });
    const payload = await response.json();
    setShock(payload.shock);
    setStage("shock");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <button className="wordmark" onClick={() => setStage("intro")}>
          THE CMO TEST
        </button>
        <span>by Aditya Bayu</span>
      </header>

      {stage === "intro" && (
        <section className="intro">
          <div className="case-label">CASE-BASED MARKETING ASSESSMENT</div>
          <h1>THE CMO<br />TEST</h1>
          <div className="intro-bottom">
            <div>
              <strong>by Aditya Bayu</strong>
              <p>
                Anda akan menerima sebuah kasus bisnis dan sejumlah berkas
                pendukung. Tidak semua berkas dapat dibuka. Pilih data yang
                paling relevan, bentuk diagnosis, lalu ambil keputusan.
              </p>
            </div>
            <button className="primary" onClick={startCase}>
              BUKA CASE FILE <span>→</span>
            </button>
          </div>
        </section>
      )}

      {stage === "case" && caseData && (
        <div className="case-room">
          <div className="case-status">
            <span>CASE FILE 01</span>
            <span>{caseData.level}</span>
            <span>{openedFiles.length}/{caseData.credits} BERKAS DIBUKA</span>
          </div>

          <section className="situation">
            <div className="section-number">01</div>
            <div>
              <span className="kicker">SITUASI</span>
              <h2>{caseData.title}</h2>
              <p>{caseData.brief}</p>
            </div>
            <div className="situation-highlights">
              <div><span>CPL AWAL</span><strong>Rp48.000</strong></div>
              <div><span>CPL SAAT INI</span><strong>Rp137.000</strong></div>
              <div><span>PERIODE</span><strong>18 bulan</strong></div>
              <div><span>MEDIA BUDGET</span><strong>Rp750 juta/bulan</strong></div>
            </div>
          </section>

          <section className="evidence-section">
            <div className="section-heading">
              <div className="section-number">02</div>
              <div>
                <span className="kicker">RUANG BUKTI</span>
                <h3>Pilih berkas yang perlu Anda baca.</h3>
                <p>
                  Anda hanya dapat membuka {caseData.credits} dari{" "}
                  {caseData.files.length} berkas. Pilihan Anda merupakan bagian
                  dari penilaian.
                </p>
              </div>
            </div>

            <div className="file-grid">
              {caseData.files.map((file, index) => {
                const opened = openedFiles.some((item) => item.id === file.id);
                const unavailable =
                  !opened && openedFiles.length >= caseData.credits;
                return (
                  <button
                    key={file.id}
                    className={`file-card ${opened ? "opened" : ""}`}
                    disabled={unavailable || loadingFile === file.id}
                    onClick={() => openFile(file)}
                  >
                    <span>FILE {String(index + 1).padStart(2, "0")}</span>
                    <b>{file.title}</b>
                    <small>
                      {loadingFile === file.id
                        ? "MEMBUKA..."
                        : opened
                          ? "SUDAH DIBACA"
                          : unavailable
                            ? "TERKUNCI"
                            : file.category}
                    </small>
                  </button>
                );
              })}
            </div>

            {activeFile && (
              <article className="file-reader">
                <div className="reader-head">
                  <span>{activeFile.category}</span>
                  <button onClick={() => setActiveFile(null)} aria-label="Tutup berkas">×</button>
                </div>
                <h4>{activeFile.title}</h4>
                <p>{activeFile.content}</p>
              </article>
            )}
          </section>

          <section className="answer-section">
            <div className="section-number">03</div>
            <div className="answer-copy">
              <span className="kicker">PERTANYAAN</span>
              <h3>{caseData.question}</h3>
            </div>
            <div className="answer-field">
              <label htmlFor="answer">JAWABAN ANDA</label>
              <textarea
                id="answer"
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                placeholder="Tuliskan diagnosis, keputusan, dan rencana Anda secara ringkas..."
              />
              <div className="answer-footer">
                <span>{answer.length} karakter</span>
                <button
                  className="primary"
                  disabled={answer.trim().length < 40}
                  onClick={submitAnswer}
                >
                  KUNCI JAWABAN <span>→</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      )}

      {stage === "shock" && (
        <section className="shock-screen">
          <span className="case-label">INFORMASI BARU · SETELAH JAWABAN DIKUNCI</span>
          <h2>{shock}</h2>
          <div className="shock-response">
            <label htmlFor="follow-up">APAKAH KEPUTUSAN ANDA BERUBAH?</label>
            <textarea
              id="follow-up"
              value={followUp}
              onChange={(event) => setFollowUp(event.target.value)}
              placeholder="Jelaskan apa yang berubah, apa yang tetap, dan KPI alternatif yang Anda usulkan..."
            />
            <button
              className="primary"
              disabled={followUp.trim().length < 30}
              onClick={() => setStage("complete")}
            >
              KIRIM JAWABAN AKHIR <span>→</span>
            </button>
          </div>
        </section>
      )}

      {stage === "complete" && (
        <section className="complete-screen">
          <span className="case-label">CASE FILE 01 · SELESAI</span>
          <h2>Jawaban Anda<br />sudah dikunci.</h2>
          <p>
            Penilaian melihat kualitas data yang Anda pilih, ketepatan diagnosis,
            keputusan, dan cara Anda merespons informasi baru.
          </p>
          <button className="outline" onClick={() => window.location.reload()}>
            KEMBALI KE AWAL
          </button>
        </section>
      )}
    </main>
  );
}
