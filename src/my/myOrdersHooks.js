import jwtAuth from "../authentication/jwt.js";
import {roleTypes} from "../users/roleTypes.js";

export async function myOrdersHooks(req, res, next) {
  if (req.method === "GET") {
    const auth = jwtAuth.verify(req, res, [roleTypes.CUSTOMER]);
    if (auth?.statusCode > 400) return;
  }
  next()
}