import { Router } from "express";
import { login, logout, signUp } from "../controllers/auth.js";

const route = Router();

route.post("/login", login);
route.get("/logout", logout);
route.post("/signUp", signUp);

export default route;
