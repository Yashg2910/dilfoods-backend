import jwt from "jsonwebtoken";
import config from "../config.js";
const secret = config.auth.secret;

const jwtAuth = {
  verify: (req, res, allowedRoles) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split('Bearer ')[1];
  
    if (!token) {
      return res.status(401).json({ status: 401, message: 'Unauthorized' });
    }
    let payload;
    try {
      payload = jwt.verify(token, secret);
    } catch (e) {
      return res.status(403).json({status: 403, message: "Invalid token"});
    }
    if (!allowedRoles.includes(payload.role)) {
      return res.status(403).json({status: 403, message: "Not allowed"});
    }
    req.user = payload;
  },
  generateToken: (payload, expiry) => {
    return jwt.sign(payload, secret, { expiresIn: expiry });
  }
}

export default jwtAuth;