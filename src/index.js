const app = require("./app");
const mongoose = require("mongoose");
const logger = require("./infrastructure/utils/logger");
const port = process.env.PORT || 3000;

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/orders";

logger.info(`Attempting to connect to MongoDB at: ${MONGODB_URI}`);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    logger.info("Connected to MongoDB");
    app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    logger.error("Failed to connect to MongoDB", {
      error: err.message,
      stack: err.stack,
    });
    process.exit(1);
  });
