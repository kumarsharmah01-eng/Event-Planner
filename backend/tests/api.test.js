// Integration tests: run against a live server connected to MongoDB.
//   npm run dev   (terminal 1)   then   npm run test:api   (terminal 2)
const test = require("node:test");
const assert = require("node:assert");
const { valid, invalid } = require("./cases");

const API = process.env.API_URL || "http://localhost:5000";
const post = (body) =>
  fetch(`${API}/api/requirements`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

for (const category of ["planner", "performer", "crew"]) {
  test(`${category}: saved to MongoDB under the right category`, async () => {
    const res = await post(valid[category]);
    assert.strictEqual(res.status, 201);
    const { data } = await res.json();

    const stored = await (
      await fetch(`${API}/api/requirements/${data.id}`)
    ).json();
    assert.strictEqual(stored.data.category, category);
    assert.deepStrictEqual(
      Object.keys(stored.data.categoryDetails).sort(),
      Object.keys(valid[category].categoryDetails)
        .filter((k) => valid[category].categoryDetails[k] !== "")
        .sort(),
    );
  });
}

for (const [name, body] of Object.entries(invalid)) {
  test(`rejects: ${name}`, async () => {
    const res = await post(body);
    assert.strictEqual(res.status, 400);
    const json = await res.json();
    assert.strictEqual(json.success, false);
    assert.ok(json.errors.length > 0);
  });
}
