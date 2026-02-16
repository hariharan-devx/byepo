import Joi from "joi";

export const signupSchema = Joi.object({
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .label("Email"),
  password: Joi.string()
    .trim()
    .min(8)
    .max(10)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,10}$"))
    .required()
    .label("Password")
    .messages({
      "string.min": "Password must be at least 8 characters long.",
      "string.max": "Password must not exceed 10 characters.",
      "string.pattern.base": "Password must include uppercase, lowercase, number, and special character.",
    }),
  organization_id: Joi.number().strict().required().label("Organization ID"),
});

export const loginSchema = Joi.object({
  email: Joi.string().trim().required().label("Email"),
  password: Joi.string().trim().required().label("Password"),
});
