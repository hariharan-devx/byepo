import Joi from "joi";

export const organizationSchema = Joi.object({
  name: Joi.string().trim().required().label("Organization Name"),
});
