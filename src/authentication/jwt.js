import jwt from "jsonwebtoken";
import config from "../config.js";
const secret = config.auth.secret;

const jwtAuth = {
  verify: (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split('Bearer ')[1];
  
    if (!token) {
      return res.sendStatus(401);
    }
  
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
  
      req.user = user;
      next();
    });
  },
  generateToken: (payload, expiry) => {
    return jwt.sign(payload, secret, { expiresIn: expiry });
  }
}

export default jwtAuth;