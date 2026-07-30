"use client";

import { useMemo, useState } from "react";

type View = "home" | "case" | "commit" | "update" | "results" | "admin";

const intel = [
  { key: "margin", label: "Unit economics", body: "Contribution margin fell from 34% to 21% in six months. The decline is concentrated in the free-shipping tier." },
  { key: "retention", label: "Customer retention", body: "90-day retention is steady at 42%. Cohort retention is unchanged across acquisition channels." },
  { key: "logistics", label: "Fulfilment operations", body: "Average delivery time increased 0.6 days. Carrier surcharge increased 18% in the same period." },
  { key: "market", label: "Market position", body: "Two category competitors began offering free shipping above Rp350k. Their advertised delivery promises are unchanged." },
  { key: "promo", label: "Promotional activity", body: "Discount frequency increased 27%. Discounted orders have a 12-point lower contribution margin." },
];

const scores = [
  ["Information selection", 86], ["Problem framing", 82], ["Causal reasoning", 78], ["Commercial judgment", 88],
  ["Systems thinking", 73], ["Decision quality", 84], ["Belief updating", 91], ["Communication", 79],
];

export default function Home() {
  const [view, setView] = useState<View>("home");
  const [revealed, setRevealed] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [openIntel, setOpenIntel] = useState<string | null>(null);
  const [decision, setDecision] = useState("");
  const [locked, setLocked] = useState(false);
  const [changed, setChanged] = useState<string | null>(null);
  const credits = 5 - revealed.length;
  const current = intel.find((i) => i.key === openIntel);
  const progress = view === "case" ? 1 : view === "commit" ? 2 : view === "update" ? 3 : view === "results" ? 4 : 0;

  function ask(question?: string) {
    const text = (question || query).toLowerCase();
    const match = intel.find((item) => text.includes(item.key) || text.includes(item.label.split(" ")[0].toLowerCase())) || intel.find((item) => !revealed.includes(item.key));
    if (!match || credits === 0) return;
    setRevealed([...revealed, match.key]); setOpenIntel(match.key); setQuery("");
  }

  const shell = (content: React.ReactNode) => <main className="app-shell">
    <header className="topbar"><button className="wordmark" onClick={() => setView("home")}>OPERATING<br/><i>ALTITUDE</i></button><div className="top-meta">ASSESSMENT ENVIRONMENT <span>•</span> SECURE SESSION</div><button className="admin-link" onClick={() => setView("admin")}>ASSESSOR VIEW ↗</button></header>
    {view !== "home" && view !== "admin" && <div className="progress"><span>SIMULATION 01 / 13</span><div className="progress-line"><i style={{width: `${progress * 25}%`}} /></div><span>{progress === 0 ? "BRIEF" : progress === 1 ? "INVESTIGATE" : progress === 2 ? "COMMIT" : progress === 3 ? "UPDATE" : "REVIEW"}</span></div>}
    {content}
  </main>;

  if (view === "home") return shell(<>
    <section className="hero"><div className="eyebrow">AN ADAPTIVE DECISION ASSESSMENT <b>01—13</b></div><h1>HOW HIGH<br/>DO YOU <em>OPERATE?</em></h1><div className="hero-bottom"><p>Most assessments test what you know.<br/>This one tests what you notice, what you ask, and what you do when the information isn&apos;t complete.</p><button className="primary" onClick={() => setView("case")}>BEGIN ASSESSMENT <span>→</span></button></div></section>
    <section className="principles"><div><span>01</span><h3>Incomplete by design</h3><p>No simulation begins with a complete brief. What you choose to investigate is part of the signal.</p></div><div><span>02</span><h3>Decisions, not opinions</h3><p>Commit to a view under constraint. Then meet evidence that may require you to revise it.</p></div><div><span>03</span><h3>Auditable judgment</h3><p>Every response is assessed against explicit case rubrics and retained for review.</p></div></section>
  </>);

  if (view === "admin") return shell(<section className="admin-page"><div className="admin-heading"><div><span className="eyebrow">ASSESSOR CONSOLE</span><h2>Assessment<br/><em>oversight.</em></h2></div><button className="primary small">CREATE INVITATION <span>+</span></button></div><div className="stat-row">{[["24","ACTIVE CANDIDATES"],["08","COMPLETED THIS WEEK"],["78.4","MEDIAN OPERATING INDEX"],["4","REVIEW QUEUE"]].map(([n,l])=><div className="stat" key={l}><strong>{n}</strong><span>{l}</span></div>)}</div><div className="admin-grid"><div className="panel candidates"><div className="panel-title">CANDIDATE ACTIVITY <button>VIEW ALL</button></div>{[["Nadia Putri","Simulation 08 · In progress","63%"],["Marcus Chen","Complete · Awaiting review","100%"],["Sonia Rahman","Simulation 03 · In progress","24%"],["Arief Wijaya","Complete · Calibrated","100%"]].map((c)=><div className="candidate" key={c[0]}><b>{c[0]}</b><span>{c[1]}</span><i>{c[2]}</i></div>)}</div><div className="panel"><div className="panel-title">BENCHMARK PROFILE <button>EDIT</button></div><div className="benchmark"><strong>STRATEGIC<br/>OPERATOR</strong><span>Operating Index</span><b>86.2</b></div><p className="quiet">Based on 1 owner-completed reference assessment · v1.4 rubric</p><button className="outline">OPEN CASE LIBRARY →</button></div></div><div className="audit-strip"><span>RECENT AUDIT EVENT</span><b>Marcus Chen · Simulation 04 scored by 3 evaluators</b><button>INSPECT EVIDENCE →</button></div></section>);

  if (view === "results") return shell(<section className="results"><span className="eyebrow">ASSESSMENT COMPLETE · AUDIT ID OA-260730-018</span><h2>Your operating<br/><em>profile.</em></h2><div className="result-grid"><div className="index"><span>OPERATING INDEX</span><strong>84<span>.6</span></strong><b>STRATEGIC OPERATOR</b><p>Strong commercial judgment with unusually disciplined belief updating.</p><div className="peer">BENCHMARK SIMILARITY <b>91%</b><span>PEER+</span></div></div><div className="scorecard">{scores.map(([label,score])=><div className="score" key={String(label)}><span>{label}</span><div><i style={{width:`${score}%`}} /></div><b>{score}</b></div>)}</div></div><div className="results-actions"><button className="outline" onClick={()=>setView("home")}>RETURN TO START</button><button className="primary">DOWNLOAD ASSESSMENT RECORD <span>↓</span></button></div></section>);

  if (view === "update") return shell(<section className="case-layout"><aside><span className="eyebrow">NEW EVIDENCE</span><h2>A supplier<br/><em>constraint.</em></h2><p>After your decision was locked, the freight carrier notified the team that surcharge pricing is contractual for the next two quarters.</p><div className="shock"><span>REVEALED AFTER COMMITMENT</span><b>The surcharge cannot be negotiated or exited before Q3.</b></div></aside><section className="workspace"><span className="eyebrow">BELIEF UPDATE</span><h3>Does this evidence change<br/>your decision?</h3><div className="choice-grid"><button className={changed === "no" ? "selected" : ""} onClick={()=>setChanged("no")}>NO — THE DECISION HOLDS<span>The root cause and response remain valid.</span></button><button className={changed === "yes" ? "selected" : ""} onClick={()=>setChanged("yes")}>YES — I WOULD REVISE<span>The new constraint meaningfully changes the action.</span></button></div><label>EXPLAIN YOUR REASONING<textarea placeholder="State precisely what changed—or why it did not—and the implication for your decision." /></label><button className="primary end" disabled={!changed} onClick={()=>setView("results")}>SUBMIT FINAL POSITION <span>→</span></button></section></section>);

  if (view === "commit") return shell(<section className="commit"><div className="commit-title"><span className="eyebrow">DECISION RECORD · LOCKS ON SUBMISSION</span><h2>Make the<br/><em>call.</em></h2><p>You have investigated {revealed.length} of 5 available paths. The remaining context will no longer be available after commitment.</p></div><div className="form"><label>01 — DIAGNOSIS<textarea placeholder="What is actually happening? State the core problem, not the symptom." /></label><label>02 — DECISION<textarea value={decision} onChange={e=>setDecision(e.target.value)} placeholder="What should the business do next? Be specific." /></label><label>03 — REASONING<textarea placeholder="Connect evidence, mechanisms, and the expected commercial outcome." /></label><div className="form-split"><label>CONFIDENCE <div className="confidence"><input type="range" defaultValue="70"/><span>70%</span></div></label><label>REVERSAL FACTOR<input placeholder="The one fact that would change my decision" /></label></div><button className="primary end" disabled={!decision || locked} onClick={()=>{setLocked(true);setView("update")}}>LOCK DECISION <span>→</span></button></div></section>);

  return shell(<section className="case-layout"><aside><span className="eyebrow">SIMULATION 01 · 28 MINUTES</span><h2>The margin<br/><em>compression.</em></h2><p>Vela, a mid-market home goods retailer, has grown revenue 31% year-over-year. Yet operating margin has fallen sharply. The CEO wants a recommendation before the next board meeting.</p><dl><div><dt>REVENUE</dt><dd>+31% YoY</dd></div><div><dt>OPERATING MARGIN</dt><dd className="negative">−13 pts</dd></div><div><dt>DECISION WINDOW</dt><dd>14 days</dd></div></dl><div className="rule"><b>YOUR TASK</b> Identify what matters. You may investigate five information paths before making a recommendation.</div></aside><section className="workspace"><div className="workspace-top"><span className="eyebrow">INVESTIGATION ROOM</span><b>{credits} <small>CREDITS REMAINING</small></b></div><h3>What do you need<br/>to know?</h3><div className="inquiry"><input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key === "Enter" && ask()} placeholder="Ask a question about the business…"/><button onClick={()=>ask()}>ASK →</button></div><div className="prompt-list"><span>AVAILABLE LINES OF INQUIRY</span>{intel.map(item=><button key={item.key} disabled={revealed.includes(item.key) || credits===0} onClick={()=>ask(item.label)}>{revealed.includes(item.key) ? "✓" : "○"} {item.label}<i>{revealed.includes(item.key) ? "REVEALED" : "REQUEST"}</i></button>)}</div>{current && <div className="intel-card"><span>CASE FILE / {String(revealed.length).padStart(2,"0")}</span><button onClick={()=>setOpenIntel(null)}>×</button><h4>{current.label}</h4><p>{current.body}</p></div>}<button className="primary end" onClick={()=>setView("commit")}>PROCEED TO DECISION <span>→</span></button></section></section>);
}
