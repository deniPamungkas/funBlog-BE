import { Router } from "express";
import {
  deletePost,
  getMyPost,
  getOnePost,
  getPosts,
  getPostsByCat,
  makePost,
  updatePost,
} from "../controllers/post.js";

const route = Router();

route.post("/makePost", makePost);
route.get("/getOnePost/:id", getOnePost);
route.get("/getMyPost", getMyPost);
route.get("/getPosts", getPosts);
route.get("/getPostsByCat", getPostsByCat);
route.delete("/deletePost/:id", deletePost);
route.patch("/updatePost/:id", updatePost);

export default route;
