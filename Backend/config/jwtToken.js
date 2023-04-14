import JWT from "jsonwebtoken";

const generateToken = (id) => {
    return JWT.sign({id}, process.env.JWT_SECRET_KEY, {expiresIn: "1d"})
};

export default {
    generateToken,
}