import asyncHandler from "../utils/asyncHandler.js";
import db from "../config/mysqlConfig.js";
import {
  createFeatureFlagQuery,
  updateFeatureFlagQuery,
  deleteFeatureFlagQuery,
  listFeatureFlagQuery,
  checkFeatureFlagQuery,
} from "../dbOperations/featureFlagStatements.js";
import CustomError from "../utils/CustomError.js";

export const createFeatureFlag = asyncHandler(async (req, res, next) => {
  const { feature_key, is_enabled } = req.body;

  const created_by = req.user.id;
  const organization_id = req.user.organization_id;

  const [result] = await db.query(createFeatureFlagQuery, [feature_key, is_enabled, organization_id, created_by]);

  if (!result || result.affectedRows === 0) {
    return next(new CustomError(404, "Feature flag failed to create"));
  }

  res.status(201).json({
    status: "success",
    message: "Feature flag created successfully",
  });
});

export const updateFeatureFlag = asyncHandler(async (req, res, next) => {
  const { id, is_enabled } = req.body;

  const updated_by = req.user.id;
  const organization_id = req.user.organization_id;

  const [result] = await db.query(updateFeatureFlagQuery, [is_enabled, updated_by, organization_id, id]);

  if (!result || result.affectedRows === 0) {
    return next(new CustomError(404, "Feature flag failed to update"));
  }

  res.status(200).json({
    status: "success",
    message: "Feature flag updated successfully",
  });
});

export const deleteFeatureFlag = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const deleted_by = req.user.id;
  const organization_id = req.user.organization_id;

  const [result] = await db.query(deleteFeatureFlagQuery, [deleted_by, organization_id, id]);

  if (!result || result.affectedRows === 0) {
    return next(new CustomError(404, "Feature flag failed to delete"));
  }

  res.status(200).json({
    status: "success",
    message: "Feature flag deleted successfully",
  });
});

export const listFeatureFlag = asyncHandler(async (req, res, next) => {
  const organization_id = req.user.organization_id;

  const [result] = await db.query(listFeatureFlagQuery, [organization_id]);

  res.status(200).json({
    status: "success",
    data: result,
  });
});

export const checkFeatureFlag = asyncHandler(async (req, res, next) => {
  const { feature_key } = req.body;
  const organization_id = req.user.organization_id;

  const [result] = await db.query(checkFeatureFlagQuery, [feature_key, organization_id]);

  if (!result || result.length === 0) {
    return next(new CustomError(404, "Feature flag not found"));
  }
  res.status(200).json({
    status: "success",
    data: result[0],
  });
});
