const mongoose = require("mongoose");

// Single collection ("requirements"). Category-specific data lives in `categoryDetails`.
const requirementSchema = new mongoose.Schema(
  {
    eventName: { type: String, required: true, trim: true },
    eventType: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    location: { type: String, required: true, trim: true },
    venue: { type: String, trim: true },
    category: {
      type: String,
      enum: ["planner", "performer", "crew"],
      required: true,
      index: true,
    },
    categoryDetails: { type: Object, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

module.exports = mongoose.model("Requirement", requirementSchema);
