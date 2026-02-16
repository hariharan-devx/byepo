import Joi from "joi";

export const createFeatureFlagSchema = Joi.object({
  feature_key: Joi.string().trim().required().label("Feature Key"),
});

export const updateFeatureFlagSchema = Joi.object({
  id: Joi.number().strict().required().label("ID"),
  is_enabled: Joi.boolean().required().label("Is Enabled"),
});

export const deleteFeatureFlagSchema = Joi.object({
  id: Joi.number().required().label("ID"),
});

export const checkFeatureFlagSchema = Joi.object({
  feature_key: Joi.string().trim().required().label("Feature Key"),
});
