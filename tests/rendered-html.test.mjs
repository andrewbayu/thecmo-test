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
  assert.match(html, /The Specialist Track/);
  assert.match(html, /The Manager Track/);
  assert.match(html, /The Head &amp; VP Track/);
  assert.match(html, /0,7% kandidat yang lolos/);
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
