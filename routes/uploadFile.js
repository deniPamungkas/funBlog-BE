import { Router } from "express";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
router.post("/uploadFile", upload.single("file"), (req, res) => {
  const file = req.file;
  if (file) return res.status(200).json(file);
  return res.status(500).json("file not uploaded");
});

export default router;
