import userSchema from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const login = async (req, res) => {
  try {
    const user = await userSchema.findOne({ username: req.body.username });
    const email = await userSchema.findOne({ email: req.body.username });
    const hashedPassword = req.body.password;
    const data = user || email;
    if (user || email) {
      bcrypt.compare(hashedPassword, data.password, (err, result) => {
        if (err) return res.status(401).json({ eror: "masukkan passwordmu" });
        if (!result) {
          return res.status(402).json("wrong password");
        } else {
          const token = jwt.sign({ id: data._id }, JWT_SECRET_KEY);
          const { $__, $isNew, ...val } = data;
          const { password, ...dataUser } = val._doc;
          return res
            .status(200)
            .cookie("accessToken", token, {
              httpOnly: true,
              secure: true,
              sameSite: "none",
            })
            .json(dataUser);
        }
      });
    } else {
      return res.status(404).json("username not found");
    }
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", { secure: true, sameSite: "none" })
    .json("user has been loged out");
};

export const signUp = async (req, res) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  try {
    const newUser = new userSchema({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(200).json("berhasil membuat akun");
  } catch (error) {
    return res.status(400).json(error);
  }
};
