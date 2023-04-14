import JWT from "jsonwebtoken";

const generateRefreshToken = (id) => {
  return JWT.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "3d" });
};

export default {
  generateRefreshToken,
};
