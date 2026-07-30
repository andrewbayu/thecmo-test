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
  | "boundaryDefinition"
  | "decomposition"
  | "measurementDesign"
  | "errorAwareness"
  | "validation"
  | "constraintAdaptation";

export const scoringVersion = "2026.07-v1";

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
  boundaryDefinition: 0.2,
  decomposition: 0.2,
  measurementDesign: 0.2,
  errorAwareness: 0.15,
  validation: 0.15,
  constraintAdaptation: 0.1,
};

export const multipleChoiceScoreMaps: Record<string, number[]> = {
  S2: [0, 1, 4, 2],
  S3: [1, 4, 0, 1],
  M4: [2, 1, 4, 0],
  H1: [1, 4, 0, 2],
  H4: [1, 4, 0, 1],
};

export const writtenRubrics = {
  S5: {
    dimensions: ["metricAccuracy", "technicalJudgment", "prioritization"],
    highSignals: [
      "Memeriksa segmentasi device sebelum mengubah bidding.",
      "Menghubungkan mobile load time dengan penurunan conversion.",
      "Memeriksa message match dan drop-off per field.",
      "Mengurutkan quick fix dan measurement setelah perubahan.",
    ],
    criticalMisses: [
      "Menaikkan budget tanpa memeriksa tracking, device, atau landing page.",
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
      "boundaryDefinition",
      "decomposition",
      "measurementDesign",
      "errorAwareness",
      "validation",
      "constraintAdaptation",
    ],
    highSignals: [
      "Mendefinisikan connected air volume dan boundary yang dihitung.",
      "Memecah interior envelope, solid displacement, dan inaccessible zones.",
      "Memilih metode yang sesuai tingkat presisi yang dibutuhkan.",
      "Membuat error budget dan validasi dengan metode independen.",
      "Menyesuaikan solusi dengan budget Rp500.000 dan waktu enam jam.",
    ],
    criticalMisses: [
      "Hanya memakai panjang × lebar × tinggi tanpa koreksi interior.",
      "Mengusulkan pembongkaran permanen.",
      "Tidak menyebut validasi atau sumber error.",
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
