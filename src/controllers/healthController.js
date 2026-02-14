import CustomError from "../utils/CustomError.js";

const healthz = async (req, res, next) => {
  const health = true;
  if (!health) {
    const error = new CustomError(404, "Health not found!");
    return next(error);
  }

  res.status(200).json({
    status: "success",
    data: null,
  });
};

export default healthz;
