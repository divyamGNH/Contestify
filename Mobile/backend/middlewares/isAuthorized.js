import jwt from "jsonwebtoken";

// ✅ Middleware to check if the user is authorized (token via headers)
const isAuthorized = (req, res, next) => {
  // Expecting:  Authorization: Bearer <token>
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token. Not authorized." });
  }

  const token = authHeader.split(" ")[1]; // extract token after "Bearer"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("JWT verification error:", error);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

export default isAuthorized;

