import postSchema from "../models/post.js";
import jwt from "jsonwebtoken";

export const makePost = (req, res) => {
  const token = req.cookies.accessToken;
  try {
    jwt.verify(token, "secretkey", async (err, userInfo) => {
      if (err) return res.status(400).json("not logged in");
      const newPost = new postSchema({
        author: userInfo.id,
        title: req.body.title,
        postPic: req.body.postPic,
        content: req.body.content,
        category: req.body.category,
        draft: req.body.draft,
      });
      const po = await newPost.save();
      return res.status(200).json(po);
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getOnePost = (req, res) => {
  const token = req.cookies.accessToken;
  try {
    jwt.verify(token, "secretkey", async (err, userInfo) => {
      if (err) return res.status(400).json("not logged in");
      const result = await postSchema.findById(req.params.id);
      return res.status(200).json(result);
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getMyPost = (req, res) => {
  const token = req.cookies.accessToken;
  try {
    jwt.verify(token, "secretkey", async (err, userInfo) => {
      if (err) return res.status(400).json("not logged in");
      const result = await postSchema.find({ author: userInfo.id });
      return res.status(200).json(result);
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getPostsByCat = async (req, res) => {
  try {
    const result = await postSchema.find({ category: req.body.category });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getPosts = async (req, res) => {
  try {
    const result = await postSchema.find();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  try {
    jwt.verify(token, "secretkey", async (err, userInfo) => {
      if (err) return res.status(400).json("not logged in");
      const po = await postSchema.deleteOne({ _id: req.params.id });
      return res.status(200).json(po);
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const updatePost = (req, res) => {
  const token = req.cookies.accessToken;
  try {
    jwt.verify(token, "secretkey", async (err, userInfo) => {
      if (err) return res.status(400).json("not logged in");
      const po = await postSchema.findOneAndUpdate(
        { _id: req.params.id },
        req.body
      );
      return res.status(200).json(po);
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};
