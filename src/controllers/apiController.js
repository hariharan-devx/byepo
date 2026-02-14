import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/CustomError.js";
import db from "../config/mysqlConfig.js";
import { getApiList } from "../dbOperations/apiStatements.js";
import { deleteUser } from "../dbOperations/usersStatements.js";

export const checkApi = asyncHandler(async (req, res, next) => {
  const [rows] = await db.query(getApiList, ["test"]);

  if (rows.length === 0) {
    return next(new CustomError(404, "API not found"));
  }

  res.status(200).json({
    status: "success",
    data: rows,
  });
});

export const deleteApi = asyncHandler(async (req, res, next) => {
  const deleteUsers = await db.query(deleteUser, [req.params.id]);
  // console.log(rows);

  if (!deleteUsers || deleteUsers.affectedRows === 0) {
    return next(new CustomError(404, "User failed to delete"));
  }

  res.status(200).json({
    status: "success",
    data: null,
  });
});
