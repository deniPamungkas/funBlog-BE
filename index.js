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

const DATABASE_URL = process.env.DATABASE_URL;
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

//MIDDLEWARES
app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use("/file", uploadFile);
app.use("/auth", auth);
app.use("/post", post);
