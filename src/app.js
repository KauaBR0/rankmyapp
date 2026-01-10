const express = require("express");
const app = express();
const orderRoutes = require("./infrastructure/web/routes/OrderRoutes");
const {
  errorHandler,
  notFoundHandler,
} = require("./infrastructure/web/middlewares/errorHandler");

app.use(express.json());

app.use("/orders", orderRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Handle 404
app.use(notFoundHandler);

// Global Error Handler
app.use(errorHandler);

module.exports = app;
