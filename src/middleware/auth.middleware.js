import jwt from "jsonwebtoken";

export function identifyUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }

  let decode;

  try {
    decode = jwt.verify(token, process.env.JWT_SECRETS);

    req.user = decode;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
}
