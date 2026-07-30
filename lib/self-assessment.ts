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

type EvidenceRule = { label: string; terms: string[] };

const evidenceRules: Record<string, EvidenceRule[]> = {
  S5: [
    { label: "Audit measurement atau tracking sebelum mengubah media.", terms: ["tracking", "event", "pixel", "tag", "measurement"] },
    { label: "Mendiagnosis masalah mobile atau kecepatan halaman.", terms: ["mobile", "load", "page speed", "kecepatan", "6,8"] },
    { label: "Menangani message match atau friction pada form.", terms: ["hero", "pesan", "message match", "nomor telepon", "form", "friction"] },
    { label: "Membuat urutan eksperimen dengan threshold keputusan.", terms: ["prioritas", "uji", "eksperimen", "a/b", "threshold", "decision gate", "impact"] },
  ],
  S9: [
    { label: "Tidak menyamakan kenaikan conversion dengan kemenangan bisnis.", terms: ["bukan berarti menang", "tidak otomatis menang", "conversion saja", "cr saja"] },
    { label: "Menghitung economics setelah diskon.", terms: ["margin", "contribution", "aov", "gross profit", "laba"] },
    { label: "Memperhitungkan kualitas transaksi sesudah pembelian.", terms: ["refund", "repeat", "cohort", "ltv", "retention"] },
    { label: "Menetapkan data atau threshold yang dapat membalikkan keputusan.", terms: ["threshold", "jika", "reversal", "bukt", "validasi"] },
  ],
  S10: [
    { label: "Menetapkan ICP berdasarkan fit enterprise atau buying context.", terms: ["icp", "enterprise", "200 karyawan", "hr leader", "buying committee"] },
    { label: "Membuat value exchange yang spesifik, bukan ebook generik.", terms: ["audit", "calculator", "template", "assessment", "spesifik", "playbook"] },
    { label: "Melakukan progressive qualification pada form atau journey.", terms: ["qualification", "kualifikasi", "form", "company size", "jabatan", "progressive"] },
    { label: "Menghubungkan nurture ke qualified conversation dengan metric kualitas.", terms: ["14 hari", "nurture", "booked", "demo", "qualified", "pipeline", "discovery"] },
  ],
  S11: [
    { label: "Membedakan CTR atau attention dari outcome bisnis.", terms: ["ctr saja", "bukan ctr", "bukan hanya ctr", "bukan add to cart"] },
    { label: "Mengakui false scarcity dapat merusak trust.", terms: ["false scarcity", "trust", "kepercayaan", "manipul", "palsu"] },
    { label: "Mengusulkan urgency yang nyata atau customer proof.", terms: ["stok", "deadline", "kuota", "testimoni", "proof", "bukti", "nyata"] },
    { label: "Mengukur dampak hingga refund, complaint, atau repeat behavior.", terms: ["refund", "complaint", "komplain", "repeat", "retention", "csat"] },
  ],
  M2: [
    { label: "Menggunakan marginal contribution atau unit economics.", terms: ["marginal", "contribution", "margin", "profit", "economics"] },
    { label: "Memasukkan capacity sebagai constraint alokasi.", terms: ["capacity", "kapasitas", "sales", "operasional"] },
    { label: "Memasukkan market potential atau readiness setiap cabang.", terms: ["market", "pasar", "potential", "potensi", "cabang"] },
    { label: "Menyediakan learning budget atau eksperimen terukur.", terms: ["learning", "eksperimen", "test", "uji", "budget belajar"] },
  ],
  M3: [
    { label: "Membuat definisi stage atau qualification yang sama.", terms: ["definisi", "stage", "mql", "sql", "qualification"] },
    { label: "Membuat SLA dua arah dengan owner.", terms: ["sla", "owner", "dua arah", "sales", "marketing"] },
    { label: "Menetapkan reason code dan feedback loop.", terms: ["reason code", "lost reason", "feedback", "loop", "loss"] },
    { label: "Menyatukan tim pada shared outcome.", terms: ["shared", "bersama", "revenue", "pipeline", "outcome"] },
  ],
  M4: [
    { label: "Memilih segment atau job-to-be-done yang fokus.", terms: ["segment", "segmen", "jtbd", "job to be done", "icp"] },
    { label: "Merangkai conversion path dari asset sampai booked call.", terms: ["funnel", "landing", "form", "qualification", "booked", "call"] },
    { label: "Mengalokasikan Rp15 juta berdasarkan fungsi dan constraint.", terms: ["15 juta", "rp15", "budget", "alokasi", "founder"] },
    { label: "Menetapkan metrik tahap awal dan decision gate.", terms: ["metric", "cpl", "cpa", "qualified", "threshold", "gate"] },
  ],
  M8: [
    { label: "Memisahkan containment, recovery, dan structural fix.", terms: ["containment", "recovery", "structural", "72 jam", "hari ke"] },
    { label: "Menetapkan owner dan sequencing tindakan.", terms: ["owner", "urutan", "hari 1", "72", "prioritas"] },
    { label: "Menggunakan leading indicator dan decision gate.", terms: ["leading", "indicator", "threshold", "gate", "metric"] },
    { label: "Memperbarui diagnosis saat qualified leads pulih tetapi sales datar.", terms: ["qualified", "sales", "hari ke-10", "update", "diagnosis"] },
  ],
  H1: [
    { label: "Mengambil posisi tegas terhadap target CPL board.", terms: ["tolak target cpl", "setuju target cpl", "reframe target", "tidak menerima target"] },
    { label: "Membangun allowable CAC dari economics dan capacity.", terms: ["cac", "allowable", "margin", "ltv", "capacity", "kapasitas"] },
    { label: "Membedakan lead cost dari kualitas pertumbuhan.", terms: ["quality", "kualitas", "downstream", "revenue", "conversion"] },
    { label: "Menyebut validasi incrementality atau KPI board.", terms: ["incrementality", "incremental", "kpi", "validasi", "cohort"] },
  ],
  H2: [
    { label: "Membedakan revenue growth dari quality of earnings.", terms: ["quality of earnings", "kualitas pendapatan", "kualitas revenue", "profit quality"] },
    { label: "Memprioritaskan cash conversion atau runway.", terms: ["cash", "runway", "cash conversion", "burn", "ar"] },
    { label: "Memeriksa concentration atau founder dependency.", terms: ["concentration", "konsentrasi", "founder", "dependency", "governance"] },
    { label: "Menyatakan owner, metric, dan target 90 hari.", terms: ["90 hari", "owner", "target", "metric", "kpi"] },
  ],
  H3: [
    { label: "Memilih pertanyaan dengan information gain tinggi.", terms: ["information gain", "pertanyaan paling", "hipotesis utama", "data paling penting"] },
    { label: "Memetakan revenue equation.", terms: ["price", "volume", "mix", "retention", "revenue equation"] },
    { label: "Mengidentifikasi constraint utama termasuk capacity.", terms: ["constraint", "bottleneck", "capacity", "kapasitas", "limit"] },
    { label: "Menyatakan confidence dan reversal condition.", terms: ["confidence", "keyakinan", "jika", "reversal", "threshold"] },
  ],
  H4: [
    { label: "Menolak volume artikel sebagai target utama.", terms: ["tolak 500", "jangan 500", "tidak 500 artikel", "bukan 500 artikel"] },
    { label: "Membahas AIO, AEO, GEO, atau AI search secara spesifik.", terms: ["aio", "aeo", "geo", "ai search", "llm", "answer engine"] },
    { label: "Membangun content system dari expertise, entity, dan proof.", terms: ["expertise", "entity", "proof", "case study", "evidence", "author"] },
    { label: "Menghubungkan visibility dengan qualified demand dan measurement.", terms: ["qualified", "pipeline", "demand", "conversion", "measurement", "metric"] },
  ],
  H7: [
    { label: "Mendesain ulang decision rights atau ownership.", terms: ["decision rights", "ownership", "owner", "raci", "wewenang"] },
    { label: "Mengurangi work in progress atau menetapkan stop-doing.", terms: ["stop", "wip", "prioritas", "kurangi", "hentikan"] },
    { label: "Mengaitkan struktur dengan target dan capacity.", terms: ["target", "capacity", "kapasitas", "headcount", "resource"] },
    { label: "Menciptakan operating cadence atau feedback loop.", terms: ["cadence", "weekly", "mingguan", "review", "feedback"] },
  ],
  F1: [
    { label: "Menggunakan proxy fisik untuk mengisi atau memetakan ruang.", terms: ["air", "cairan", "pasir", "foam", "scan", "lidar", "3d"] },
    { label: "Menjelaskan cara mengukur volume secara kuantitatif.", terms: ["liter", "meter kubik", "m3", "flow meter", "tangki", "ukur"] },
    { label: "Memperhatikan containment atau kondisi bus.", terms: ["kedap", "segel", "tutup", "tertutup", "interior"] },
    { label: "Mempertimbangkan eksekusi praktis dan risiko.", terms: ["bocor", "berat", "bersihkan", "drain", "aman", "risiko"] },
  ],
};

const criticalPatterns: Record<string, string[]> = {
  S5: ["langsung naikkan budget", "langsung menaikkan budget"],
  S9: ["menang karena conversion naik", "menang karena transaksi naik"],
  S10: ["fokus download", "hanya open rate"],
  S11: ["tetap pakai false scarcity", "pertahankan countdown palsu"],
  M2: ["bagi rata", "dibagi rata"],
  M3: ["sla sepihak"],
  M4: ["semua channel", "daftar channel"],
  M8: ["tanpa owner", "semua dikerjakan"],
  H1: ["turunkan cpl 50", "potong cpl 50"],
  H2: ["langsung fundraising", "akselerasi tanpa"],
  H3: ["langsung investasi", "setujui target tanpa"],
  H4: ["langsung buat 500 artikel", "publish 500 artikel"],
  H7: ["semua tetap dikerjakan"],
  F1: [],
};

function normalizeAnswer(answer: string) {
  return answer.toLocaleLowerCase("id-ID").replace(/[^a-z0-9]+/g, " ");
}

function matchesTerm(answer: string, term: string) {
  return answer.includes(normalizeAnswer(term));
}

function buildRuleReview(caseId: string, answer: string): WrittenReview {
  const normalizedAnswer = normalizeAnswer(answer);
  const rules = evidenceRules[caseId] ?? [];
  const matchedRules = rules.filter((rule) =>
    rule.terms.some((term) => matchesTerm(normalizedAnswer, term)),
  );
  const missingRules = rules.filter((rule) => !matchedRules.includes(rule));
  const criticalMiss = (criticalPatterns[caseId] ?? []).some((pattern) =>
    matchesTerm(normalizedAnswer, pattern),
  );

  return {
    caseId,
    score: Math.round((matchedRules.length / Math.max(rules.length, 1)) * 4),
    strength:
      matchedRules.length > 0
        ? matchedRules.map((rule) => rule.label).join(" ")
        : "Belum ada indikator rubric yang terbaca dalam jawaban.",
    gap:
      missingRules.length > 0
        ? `Tambahkan: ${missingRules.slice(0, 2).map((rule) => rule.label).join(" ")}`
        : "Seluruh indikator rubric untuk kasus ini sudah tercakup.",
    criticalMiss,
  };
}

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

export function evaluateRuleBasedAssessment(input: {
  track: TrackId;
  answers: Record<string, string>;
}): AssessmentResult {
  const writtenReviews = Object.keys(trackCaseWeights[input.track])
    .filter((caseId) => !multipleChoiceScoreMaps[caseId])
    .map((caseId) => buildRuleReview(caseId, input.answers[caseId] ?? ""));
  const strongest = [...writtenReviews].sort((a, b) => b.score - a.score)[0];
  const focus = [...writtenReviews].sort((a, b) => a.score - b.score)[0];
  const completeReviews = writtenReviews.filter((review) => review.score === 4).length;

  return buildAssessmentResult({
    track: input.track,
    answers: input.answers,
    writtenReviews,
    summary: `Skor ini dihitung dari indikator rubric yang terbaca pada jawaban Anda. ${completeReviews} dari ${writtenReviews.length} jawaban tulisan telah mencakup seluruh indikator utamanya.`,
    strongestSignal: strongest
      ? `${activeCaseContext[strongest.caseId]?.title ?? strongest.caseId}: ${strongest.strength}`
      : "Belum ada jawaban tulisan yang dapat dinilai.",
    focusArea: focus
      ? `${activeCaseContext[focus.caseId]?.title ?? focus.caseId}: ${focus.gap}`
      : "Tidak ada focus area yang tersedia.",
  });
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
