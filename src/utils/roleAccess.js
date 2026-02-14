import CustomError from "./CustomError.js";

export const validateRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return next(new CustomError(401, "You do not have permission to perform this action"));
    }
    next();
  };
};

export const validateMultipleRole = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(new CustomError(401, "You do not have permission to perform this action"));
    }
    next();
  };
};
