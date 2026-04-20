import jwt from "jsonwebtoken";

export const guestAuth = (req, res, next) => {
  try {
    const authHeader =
      req.headers["authorization"] || req.headers["Authorization"];
    //console.log("authHeader:", authHeader); // should print Bearer eyJ...

    const token = authHeader?.split(" ")[1];
    //console.log("token:", token); // should print the token

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //console.log("decoded:", decoded); // should print { userId, iat, exp }
      req.user = decoded;
    }
  } catch (err) {
    console.log("token error:", err.message); // ✅ see if token is expired
  }
  next();
};
