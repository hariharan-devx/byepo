process.on("uncaughtException", (err) => {
  console.error(err.name, err.message);
  console.error("Uncaught Exception occurred! Shutting down...");
  process.exit(1);
});

import app from "./app.js";

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.error(err.name, err.message);
  console.error("Unhandled rejection occurred! Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
