import asyncHandler from "../utils/asyncHandler.js";
import db from "../config/mysqlConfig.js";
import { createOrganizationQuery, getOrganizationsQuery } from "../dbOperations/organizationStatements.js";
import CustomError from "../utils/CustomError.js";

export const createOrganization = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const [result] = await db.query(createOrganizationQuery, [name]);

  if (!result || result.affectedRows === 0) {
    return next(new CustomError(404, "Organization failed to create"));
  }

  res.status(201).json({
    status: "success",
    message: "Organization created successfully",
  });
});

export const getOrganizations = asyncHandler(async (req, res) => {
  const [result] = await db.query(getOrganizationsQuery);

  if (!result || result.length === 0) {
    return next(new CustomError(404, "Organizations not found"));
  }

  res.status(200).json({
    status: "success",
    data: result,
  });
});
