import "server-only";

export type TrackId = "specialist" | "manager" | "head";

export type RoleDimension =
  | "informationSelection"
  | "metricAccuracy"
  | "problemFraming"
  | "technicalJudgment"
  | "commercialJudgment"
  | "prioritization"
  | "systemsThinking"
  | "beliefUpdating";

export type SchoolBusDimension =
  | "problemReframing"
  | "originality"
  | "practicality"
  | "executionClarity"
  | "criticalAwareness";

export const scoringVersion = "2026.07-v6-rule-based";

export const commonScale = {
  0: "Miss — tidak memahami inti masalah atau keputusan tidak relevan.",
  1: "Surface — menangkap gejala, tetapi reasoning masih dangkal.",
  2: "Analytical — menggunakan data dengan benar dan menemukan sebagian causal chain.",
  3: "Strategic — memahami trade-off, threshold, dan downstream implication.",
  4: "Operator — diagnosis, keputusan, eksekusi, asumsi, dan feedback loop terintegrasi.",
} as const;

export const roleDimensionWeights: Record<
  TrackId,
  Record<RoleDimension, number>
> = {
  specialist: {
    informationSelection: 0.15,
    metricAccuracy: 0.2,
    problemFraming: 0.15,
    technicalJudgment: 0.2,
    commercialJudgment: 0.1,
    prioritization: 0.1,
    systemsThinking: 0.05,
    beliefUpdating: 0.05,
  },
  manager: {
    informationSelection: 0.15,
    metricAccuracy: 0.1,
    problemFraming: 0.15,
    technicalJudgment: 0.1,
    commercialJudgment: 0.15,
    prioritization: 0.15,
    systemsThinking: 0.15,
    beliefUpdating: 0.1,
  },
  head: {
    informationSelection: 0.15,
    metricAccuracy: 0.05,
    problemFraming: 0.15,
    technicalJudgment: 0.05,
    commercialJudgment: 0.2,
    prioritization: 0.15,
    systemsThinking: 0.15,
    beliefUpdating: 0.1,
  },
};

export const schoolBusWeights: Record<SchoolBusDimension, number> = {
  problemReframing: 0.25,
  originality: 0.25,
  practicality: 0.25,
  executionClarity: 0.15,
  criticalAwareness: 0.1,
};

export const multipleChoiceScoreMaps: Record<string, number[]> = {
  S2: [2, 2, 4, 1],
  S3: [2, 4, 1, 2],
};

export const writtenRubrics = {
  S5: {
    dimensions: [
      "informationSelection",
      "metricAccuracy",
      "technicalJudgment",
      "prioritization",
      "beliefUpdating",
    ],
    highSignals: [
      "Memisahkan fakta, hipotesis, dan informasi yang masih perlu diuji.",
      "Memprioritaskan mobile performance dan form friction berdasarkan besar perubahan.",
      "Mengalokasikan empat jam developer pada perubahan dengan expected value tertinggi.",
      "Menetapkan bukti atau threshold yang dapat mengubah urutan tindakan.",
    ],
    criticalMisses: [
      "Menaikkan budget tanpa memeriksa tracking, device, atau landing page.",
    ],
  },
  S9: {
    dimensions: [
      "metricAccuracy",
      "problemFraming",
      "commercialJudgment",
      "beliefUpdating",
    ],
    highSignals: [
      "Tidak menyamakan kenaikan conversion rate dengan kemenangan bisnis.",
      "Membangun perbandingan contribution margin per visitor setelah diskon dan refund.",
      "Mempertimbangkan cohort value atau repeat purchase, bukan hanya transaksi awal.",
      "Menyebut data atau threshold yang dapat membalikkan keputusan.",
    ],
    criticalMisses: [
      "Menyatakan eksperimen menang hanya karena conversion atau transaksi meningkat.",
    ],
  },
  S11: {
    dimensions: [
      "problemFraming",
      "technicalJudgment",
      "commercialJudgment",
      "systemsThinking",
    ],
    highSignals: [
      "Membedakan attention metric dari purchase dan post-purchase outcome.",
      "Menjelaskan false scarcity sebagai pemicu urgency sekaligus perusak trust.",
      "Mengusulkan urgency yang nyata atau customer proof sebagai hipotesis pengganti.",
      "Mengukur dampak sampai purchase, refund, complaint, atau repeat behavior.",
    ],
    criticalMisses: [
      "Mempertahankan manipulasi yang terbukti meningkatkan complaint tanpa mitigasi.",
    ],
  },
  S10: {
    dimensions: [
      "informationSelection",
      "problemFraming",
      "technicalJudgment",
      "commercialJudgment",
      "prioritization",
    ],
    highSignals: [
      "Memilih ICP berdasarkan sales fit dan buying context, bukan sekadar volume download.",
      "Mengubah value exchange dari konten generik menjadi asset yang membantu masalah spesifik ICP.",
      "Memilih progressive qualification yang mengurangi noise tanpa menciptakan friction buta.",
      "Menghubungkan nurturing ke discovery call dengan mempertimbangkan kapasitas sales.",
      "Menggunakan cost per qualified conversation atau pipeline quality sebagai metric utama.",
    ],
    criticalMisses: [
      "Mengoptimalkan download atau email open rate tanpa memperbaiki relevance terhadap ICP.",
    ],
  },
  M2: {
    dimensions: ["commercialJudgment", "prioritization", "systemsThinking"],
    highSignals: [
      "Menggunakan marginal contribution, capacity, dan market potential.",
      "Menyisihkan learning budget untuk cabang baru.",
      "Membedakan fairness dari pembagian budget yang sama rata.",
    ],
    criticalMisses: ["Membagi budget rata tanpa mempertimbangkan kapasitas."],
  },
  M3: {
    dimensions: ["problemFraming", "prioritization", "systemsThinking"],
    highSignals: [
      "Membuat definisi stage dan reason code bersama.",
      "Membuat SLA dua arah dengan owner dan escalation path.",
      "Menghubungkan marketing dan sales pada shared outcome.",
    ],
    criticalMisses: ["Menetapkan SLA sepihak tanpa definisi qualification."],
  },
  M4: {
    dimensions: [
      "informationSelection",
      "problemFraming",
      "commercialJudgment",
      "prioritization",
      "systemsThinking",
      "beliefUpdating",
    ],
    highSignals: [
      "Memilih satu segment dan job-to-be-done yang cukup sempit untuk dieksekusi dalam 30 hari.",
      "Merangkai asset, distribusi, qualification, dan booked call sebagai satu funnel utuh.",
      "Memanfaatkan owned audience dan founder time sebagai constraint yang harus dijaga, bukan asumsi tanpa batas.",
      "Membuat alokasi budget berbasis fungsi serta metrik tahap awal sampai qualified conversation.",
      "Menyebut decision gate yang jelas untuk mengubah angle, channel, atau menghentikan investasi.",
    ],
    criticalMisses: [
      "Menyusun daftar channel tanpa satu conversion path yang jelas atau tanpa mempertimbangkan kapasitas sales.",
    ],
  },
  M8: {
    dimensions: [
      "problemFraming",
      "prioritization",
      "systemsThinking",
      "beliefUpdating",
    ],
    highSignals: [
      "Memisahkan containment, recovery, dan structural fix.",
      "Menetapkan owner, leading indicator, dan decision gate.",
      "Tidak menyamakan pemulihan qualified leads dengan pemulihan sales.",
      "Memperbarui diagnosis setelah informasi hari ke-10 dan menghentikan tindakan yang tidak lagi relevan.",
    ],
    criticalMisses: ["Membuat daftar aktivitas tanpa sequencing atau owner."],
  },
  H2: {
    dimensions: [
      "commercialJudgment",
      "prioritization",
      "systemsThinking",
    ],
    highSignals: [
      "Membedakan revenue growth dari quality of earnings.",
      "Memprioritaskan margin, cash conversion, concentration, dan founder dependency.",
      "Menyebut metrik, owner, dan target 90 hari.",
    ],
    criticalMisses: ["Merekomendasikan akselerasi tanpa membahas kas atau margin."],
  },
  H1: {
    dimensions: [
      "problemFraming",
      "commercialJudgment",
      "prioritization",
      "systemsThinking",
    ],
    highSignals: [
      "Memberi keputusan yang tegas terhadap target, bukan sekadar meminta lebih banyak data.",
      "Membangun allowable acquisition cost dari unit economics dan capacity.",
      "Membedakan kenaikan CPL dari penurunan kualitas pertumbuhan.",
      "Mengusulkan KPI dan validasi incrementality yang dapat dipahami board.",
    ],
    criticalMisses: [
      "Menerima atau memotong target CPL tanpa menghubungkannya ke economics dan downstream outcome.",
    ],
  },
  H3: {
    dimensions: [
      "informationSelection",
      "problemFraming",
      "commercialJudgment",
      "prioritization",
    ],
    highSignals: [
      "Memilih pertanyaan dengan information gain tinggi.",
      "Memetakan revenue equation melalui price, volume, mix, retention, dan capacity.",
      "Menyatakan confidence dan reversal condition.",
    ],
    criticalMisses: ["Memilih investasi sebelum menguji constraint utama."],
  },
  H4: {
    dimensions: [
      "informationSelection",
      "problemFraming",
      "commercialJudgment",
      "prioritization",
      "systemsThinking",
      "beliefUpdating",
    ],
    highSignals: [
      "Menolak content volume sebagai tujuan dan memberi keputusan yang tegas terhadap rencana 500 artikel.",
      "Mengubah pertanyaan implementasi, expert experience, bukti pelanggan, dan sumber primer menjadi content system yang defensible.",
      "Memperkuat fondasi discovery tanpa menganggap AIO, AEO, atau GEO sebagai taktik terpisah dari useful content dan SEO dasar.",
      "Memilih sedikit asset substansial dengan ownership, distribution, dan maintenance yang jelas.",
      "Menghubungkan visibility dengan qualified demand, assisted pipeline, dan learning loop; bukan hanya traffic atau citation count.",
    ],
    criticalMisses: [
      "Merekomendasikan produksi massal artikel AI generik untuk memanipulasi visibility tanpa added value atau evidence.",
    ],
  },
  H7: {
    dimensions: [
      "problemFraming",
      "prioritization",
      "systemsThinking",
      "commercialJudgment",
    ],
    highSignals: [
      "Mendesain ownership dan decision rights, bukan menambah workload.",
      "Melepas kapasitas melalui stop-doing dan automation.",
      "Menghubungkan operating cadence dengan shared metrics.",
    ],
    criticalMisses: ["Mempertahankan semua inisiatif tanpa capacity release."],
  },
  F1: {
    dimensions: [
      "problemReframing",
      "originality",
      "practicality",
      "executionClarity",
      "criticalAwareness",
    ],
    highSignals: [
      "Mengubah bentuk masalah agar volume dapat diketahui tanpa mengukur setiap bagian satu per satu.",
      "Menawarkan pendekatan orisinal yang benar-benar dapat menghasilkan ukuran volume.",
      "Menjelaskan prasyarat, alat, urutan kerja, dan cara memperoleh hasil akhir.",
      "Menyeimbangkan kreativitas dengan waktu, tenaga, biaya, risiko, dan dampak terhadap bus.",
      "Mengantisipasi kelemahan metodenya sendiri serta menawarkan mitigasi yang masuk akal.",
    ],
    criticalMisses: [
      "Memberikan ide yang secara fisik tidak dapat menghasilkan ukuran volume.",
      "Tidak menjelaskan bagaimana metode tersebut menghasilkan angka yang dapat digunakan.",
    ],
  },
} as const;

export const classificationBands = [
  { min: 94, label: "Exceptional / Cross-Level Operator" },
  { min: 88, label: "Senior / Next-Level Signal" },
  { min: 80, label: "Strong" },
  { min: 70, label: "Ready" },
  { min: 55, label: "Role-Capable with Supervision" },
  { min: 40, label: "Developing" },
  { min: 0, label: "Below Role Readiness" },
] as const;

export const hiringRecommendationBands = [
  { min: 88, label: "Strong Advance" },
  { min: 80, label: "Advance" },
  { min: 70, label: "Review / Hold" },
  { min: 0, label: "Do Not Advance" },
] as const;

type ScoreSet<T extends string> = Record<T, number>;

export function calculateOperatingIndex(input: {
  track: TrackId;
  roleScores: ScoreSet<RoleDimension>;
  schoolBusScores: ScoreSet<SchoolBusDimension>;
  unresolvedCriticalMisses?: number;
}) {
  const roleScore = weightedScore(
    input.roleScores,
    roleDimensionWeights[input.track],
  );
  const schoolBusScore = weightedScore(
    input.schoolBusScores,
    schoolBusWeights,
  );
  const rawIndex = Math.round(roleScore * 0.8 + schoolBusScore * 0.2);
  const operatingIndex =
    (input.unresolvedCriticalMisses ?? 0) > 0
      ? Math.min(rawIndex, 69)
      : rawIndex;

  return {
    scoringVersion,
    rawIndex,
    operatingIndex,
    classification: findBand(operatingIndex, classificationBands),
    hiringRecommendation: findBand(
      operatingIndex,
      hiringRecommendationBands,
    ),
  };
}

function weightedScore<T extends string>(
  scores: ScoreSet<T>,
  weights: Record<T, number>,
) {
  return (
    (Object.keys(weights) as T[]).reduce((total, dimension) => {
      const score = scores[dimension];
      const weight = weights[dimension];
      if (score < 0 || score > 4) {
        throw new Error(`Score ${dimension} harus berada pada skala 0–4.`);
      }
      return total + (score / 4) * 100 * weight;
    }, 0)
  );
}

function findBand(
  score: number,
  bands: ReadonlyArray<{ min: number; label: string }>,
) {
  return bands.find((band) => score >= band.min)?.label ?? bands.at(-1)!.label;
}
