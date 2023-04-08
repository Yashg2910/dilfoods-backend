import multer from "multer";
import jwtAuth from "../authentication/jwt.js";
import {roleTypes} from "../users/roleTypes.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
});

const upload = multer({ storage: storage });

export async function menuItemsHooks(req, res, next) {
  if (req.method === "POST") {
    return handlePOSTAndPut(req, res, next);
  } else if (req.method === "PUT") {
    return handlePOSTAndPut(req, res, next);
  } else if (req.method === "DELETE") {
    const auth = jwtAuth.verify(req, res, [roleTypes.STAFF]);
    if (auth?.statusCode > 400) return;
  }

  next();
}

function handlePOSTAndPut(req, res, next) {
  const auth = jwtAuth.verify(req, res, [roleTypes.STAFF]);
  if (auth?.statusCode > 400) return;
  return upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: 'File upload error', error: err });
    }
    next();
  });
}