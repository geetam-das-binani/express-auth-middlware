import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  let token = authHeader && authHeader.split(" ")[1];

  if (!token && req.cookies.access_token) {
    token = req.cookies.access_token;
  }
  if (!token && req.body.access_token) {
    token = req.body.access_token;
  }

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized Access",
    });
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedData?.user;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid Token",
    });
  }
};
