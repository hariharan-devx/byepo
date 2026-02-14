import asyncHandler from "../utils/asyncHandler.js";

export const health = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Byepo Backend service is running",
  });
});
