import { Router } from "express";
import { getPosts } from "../controllers/post.controller.js";

const router = Router();

router.get("/posts", getPosts);

export default router;