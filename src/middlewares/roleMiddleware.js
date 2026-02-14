import CustomError from "../utils/CustomError.js";

export const roleMiddleware = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(new CustomError(401, "You do not have permission to perform this action"));
    }
    next();
  };
};
