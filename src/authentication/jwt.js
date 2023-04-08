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
  
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      if (!allowedRoles.includes[user.role]) {
        return res.sendStatus(403);
      }
      req.user = user;
    });
  },
  generateToken: (payload, expiry) => {
    return jwt.sign(payload, secret, { expiresIn: expiry });
  }
}

export default jwtAuth;