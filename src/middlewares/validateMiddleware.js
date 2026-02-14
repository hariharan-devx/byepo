import CustomError from "../utils/CustomError.js";

export const validateRequest = (schema, source = "body") => {
  return (req, res, next) => {
    const { error } = schema.validate(req[source]);
    if (error) {
      const errorMessage = error.details[0].message.replace(/"/g, "");
      return next(new CustomError(400, errorMessage));
    }
    next();
  };
};
