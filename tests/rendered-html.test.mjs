import assert from "node:assert/strict";
import test from "node:test";

async function request(path = "/", init) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, init),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders The CMO Test landing page", async () => {
  const response = await request();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>The CMO Test — Aditya Bayu<\/title>/i);
  assert.match(html, /<strong>Specialist<\/strong>/);
  assert.match(html, /<strong>Manager<\/strong>/);
  assert.match(html, /<strong>Head &amp; VP<\/strong>/);
  assert.match(html, /97% FAILED THE TEST/i);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
});

test("rejects incomplete assessment submissions before database access", async () => {
  const response = await request("/api/submissions", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      track: "specialist",
      answers: { S2: "2" },
    }),
  });
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), {
    error: "Jawaban S3 belum lengkap atau terlalu panjang.",
  });
});

test("accepts and scores complete assessment submissions even when database is unavailable", async () => {
  const response = await request("/api/submissions", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      track: "specialist",
      answers: {
        S2: "2",
        S3: "1",
        S5: "Audit tracking, device breakdown, dan mobile load time sebelum mengubah budget.",
        S9: "Eksperimen belum menang karena AOV turun 30% dan margin tidak cukup.",
        S10: "Rancang lead magnet khusus ICP enterprise dengan progressive qualification.",
        S11: "False scarcity merusak trust. Ganti dengan bukti testimoni nyata.",
        F1: "Gunakan metode pengisian air atau sensor 3D untuk mengukur volume interior.",
      },
    }),
  });
  assert.equal(response.status, 201);
  const data = await response.json();
  assert.ok(data.submissionId);
  assert.equal(data.status, "scored");
  assert.ok(data.result);
  assert.equal(typeof data.result.totalScore, "number");
});
