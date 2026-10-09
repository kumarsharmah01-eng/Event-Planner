const Requirement = require("../models/Requirement");
const { CATEGORIES } = require("../config/schemas");

// POST /api/requirements  (body already validated by middleware -> req.validated)
exports.createRequirement = async (req, res, next) => {
  try {
    const requirement = await Requirement.create(req.validated);
    res.status(201).json({
      success: true,
      message: "Requirement created successfully",
      data: { id: requirement._id },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/requirements?category=planner  (handy for checking what was stored)
exports.getRequirements = async (req, res, next) => {
  try {
    const { category } = req.query;
    if (category && !CATEGORIES.includes(category)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid category" });
    }
    const data = await Requirement.find(category ? { category } : {})
      .sort({ createdAt: -1 })
      .limit(50);
    res.json({ success: true, count: data.length, data });
  } catch (err) {
    next(err);
  }
};

// GET /api/requirements/:id
exports.getRequirementById = async (req, res, next) => {
  try {
    const data = await Requirement.findById(req.params.id);
    if (!data)
      return res
        .status(404)
        .json({ success: false, message: "Requirement not found" });
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
