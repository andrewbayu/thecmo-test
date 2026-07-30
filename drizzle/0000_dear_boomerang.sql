CREATE TABLE `assessment_submissions` (
	`id` text PRIMARY KEY NOT NULL,
	`track` text NOT NULL,
	`answers` text NOT NULL,
	`multiple_choice_points` integer NOT NULL,
	`multiple_choice_max_points` integer NOT NULL,
	`status` text DEFAULT 'pending_review' NOT NULL,
	`scoring_version` text NOT NULL,
	`reviewer_scores` text,
	`critical_misses` integer DEFAULT 0 NOT NULL,
	`operating_index` integer,
	`classification` text,
	`review_reason_code` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`reviewed_at` integer
);
