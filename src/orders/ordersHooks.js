import jwtAuth from "../authentication/jwt.js";
import {roleTypes} from "../users/roleTypes.js";

export async function ordersHooks(req, res, next) {
  if (req.method === "POST") {
    const auth = jwtAuth.verify(req, res, [roleTypes.CUSTOMER]);
    if (auth?.statusCode > 400) return;
  }
  next()
}