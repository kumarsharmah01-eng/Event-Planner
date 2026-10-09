const express = require("express");
const cors = require("cors");
const requirementRoutes = require("./routes/requirementRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || "*")
  .split(",")
  .map((o) => o.trim());
app.use(cors({ origin: allowedOrigins.includes("*") ? "*" : allowedOrigins }));
app.use(express.json({ limit: "100kb" }));

app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/requirements", requirementRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
