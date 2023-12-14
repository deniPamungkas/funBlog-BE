import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";
import path from "path";
import fs from "fs";
import url from "url";
import auth from "./routes/auth.js";
import post from "./routes/post.js";
import uploadFile from "./routes/uploadFile.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const DATABASE_URL =
  "mongodb+srv://denipamungkas:BMSBGDTG@cluster0.yzqqxu4.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT;

mongoose
  .connect(DATABASE_URL, {
    dbName: "Blog",
  })
  .then(() => {
    return console.log("connected to database");
  })
  .catch((error) => {
    return console.log(error);
  });

app.listen(PORT, () => {
  return console.log("connected to server");
});

const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};

//HANDLE UPLOAD FILE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
// app.post("/upload", upload.single("file"), (req, res) => {
//   const file = req.file;
//   if (file) return res.status(200).json("file uploaded");
//   return res.status(500).json("file not uploaded");
// });

//MIDDLEWARES
app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());

app.use(express.static("public"));
app.use("/upload", express.static("uploads"));
app.use("/file", uploadFile);
app.use("/auth", auth);
app.use("/post", post);
