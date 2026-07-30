import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const assessmentSubmissions = sqliteTable(
  "assessment_submissions",
  {
    id: text("id").primaryKey(),
    track: text("track").notNull(),
    answers: text("answers").notNull(),
    multipleChoicePoints: integer("multiple_choice_points").notNull(),
    multipleChoiceMaxPoints: integer("multiple_choice_max_points").notNull(),
    status: text("status").notNull().default("pending_review"),
    scoringVersion: text("scoring_version").notNull(),
    reviewerScores: text("reviewer_scores"),
    criticalMisses: integer("critical_misses").notNull().default(0),
    operatingIndex: integer("operating_index"),
    classification: text("classification"),
    reviewReasonCode: text("review_reason_code"),
    createdAt: integer("created_at")
      .notNull()
      .default(sql`(unixepoch())`),
    reviewedAt: integer("reviewed_at"),
  },
  (table) => [
    index("assessment_submissions_status_created_idx").on(
      table.status,
      table.createdAt,
    ),
    index("assessment_submissions_track_created_idx").on(
      table.track,
      table.createdAt,
    ),
  ],
);
