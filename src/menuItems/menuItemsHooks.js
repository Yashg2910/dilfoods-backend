import multer from "multer";

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
  if (req.method === "POST" || req.method === "post") {
    return upload.single('image')(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: 'File upload error', error: err });
      }
      next();
    });
  } else {
    next();
  }

}