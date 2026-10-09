const notFound = (_req, res) =>
  res.status(404).json({ success: false, message: "Route not found" });

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, _req, res, _next) => {
  if (err.type === "entity.parse.failed")
    return res
      .status(400)
      .json({ success: false, message: "Invalid JSON body" });
  if (err.name === "CastError")
    return res.status(400).json({ success: false, message: "Invalid id" });
  console.error(err);
  res.status(500).json({ success: false, message: "Internal server error" });
};

module.exports = { notFound, errorHandler };
