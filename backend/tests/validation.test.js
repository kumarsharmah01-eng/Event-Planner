const test = require("node:test");
const assert = require("node:assert");
const {
  validateRequirement,
} = require("../src/middleware/validateRequirement");
const { valid, invalid } = require("./cases");

for (const category of ["planner", "performer", "crew"]) {
  test(`valid ${category} submission passes`, () => {
    const { errors, data } = validateRequirement(valid[category]);
    assert.deepStrictEqual(errors, []);
    assert.strictEqual(data.category, category);
    assert.ok(data.categoryDetails);
  });
}

const fieldsOf = (body) => validateRequirement(body).errors.map((e) => e.field);

test("missing required fields are reported", () => {
  const fields = fieldsOf(invalid["Missing required fields"]);
  for (const f of [
    "eventName",
    "eventType",
    "startDate",
    "endDate",
    "location",
    "categoryDetails",
  ])
    assert.ok(fields.includes(f), f);
});
test("end date before start date is rejected", () =>
  assert.ok(fieldsOf(invalid["Invalid date range"]).includes("endDate")));
test("invalid category is rejected", () =>
  assert.ok(fieldsOf(invalid["Invalid category"]).includes("category")));
test("invalid numbers are rejected", () => {
  const fields = fieldsOf(invalid["Invalid numeric values"]);
  assert.ok(fields.includes("categoryDetails.budget"));
  assert.ok(fields.includes("categoryDetails.numberOfPerformers"));
});
test("fields from another category are stripped", () => {
  const body = {
    ...valid.crew,
    categoryDetails: { ...valid.crew.categoryDetails, genre: "Rock" },
  };
  assert.strictEqual(
    validateRequirement(body).data.categoryDetails.genre,
    undefined,
  );
});
test("numeric strings are converted to numbers", () => {
  const body = {
    ...valid.crew,
    categoryDetails: { ...valid.crew.categoryDetails, budget: "5000" },
  };
  assert.strictEqual(
    validateRequirement(body).data.categoryDetails.budget,
    5000,
  );
});
