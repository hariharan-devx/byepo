import CustomError from "../utils/CustomError.js";

const devErrors = (res, error) => {
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
    stackTrace: error.stack,
    error: error,
  });
};

const duplicateEntryErrorHandler = (err) => {
  const msg = `Duplicate entry: ${err.sqlMessage}`;
  return new CustomError(400, msg);
};
const syntaxErrorHandler = (err) => {
  const msg = `SQL syntax error: ${err.sqlMessage}`;
  return new CustomError(400, msg);
};
const foreignKeyErrorHandler = (err) => {
  const msg = `Foreign key constraint failed: ${err.sqlMessage}`;
  return new CustomError(400, msg);
};
const jwtErrorHandler = (err) => {
  return new CustomError(401, "Invalid token. Please login again!");
};
const jwtExpireErrorHandler = (err) => {
  return new CustomError(401, "Token has expired. Please login again!");
};

const prodErrors = (res, error) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong! Please try again later.",
    });
  }
};

const globalErrorHandler = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (process.env.NODE_ENV === "dev") {
    devErrors(res, error);
  } else if (process.env.NODE_ENV === "prod") {
    if (error.code === "ER_DUP_ENTRY") error = duplicateEntryErrorHandler(error);
    if (error.code === "ER_PARSE_ERROR") error = syntaxErrorHandler(error);
    if (error.code === "ER_NO_REFERENCED_ROW_2") error = foreignKeyErrorHandler(error);
    if (error.name === "TokenExpiredError") error = jwtExpireErrorHandler(error);
    if (error.name === "JsonWebTokenError") error = jwtErrorHandler(error);

    prodErrors(res, error);
  }
};

export default globalErrorHandler;
