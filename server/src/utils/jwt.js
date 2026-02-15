import jwt from "jsonwebtoken";

export const signToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const generateToken = (user, statusCode, res) => {
  const token = signToken(user);

  const options = {
    maxAge: process.env.JWT_EXPIRES,
    httpOnly: true,
    sameSite: "lax",
  };
  if (process.env.NODE_ENV === "prod") options.secure = true;

  res.cookie("jwt", token, options);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: { user },
  });
};
