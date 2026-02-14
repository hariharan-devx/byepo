import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import CustomError from "./src/utils/CustomError.js";
import globalErrorHandler from "./src/controllers/errorController.js";
import healthRoute from "./src/routes/healthRoute.js";
import authRoue from "./src/routes/authRoute.js";
import organizationRoute from "./src/routes/orginizationRoute.js";
import featureFlagRoute from "./src/routes/featureFlagRoute.js";

let app = express();

app.use(helmet());

let limitter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: "We have received too many requests from this IP. Please try after one hour.",
});

app.use("/", limitter);

app.use(express.json({ limit: "10kb" }));

app.use(morgan("dev"));

app.use(healthRoute);
app.use(authRoue);
app.use(organizationRoute);
app.use(featureFlagRoute);

app.use((req, res, next) => {
  const err = new CustomError(404, `Can't find ${req.originalUrl} on the server!`);
  next(err);
});

app.use(globalErrorHandler);

export default app;
