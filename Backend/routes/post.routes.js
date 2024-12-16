import { Router } from "express";
import { getPost, getPosts } from "../controllers/post.controller.js";

const router = Router();

router.get("/getPosts", getPosts);
router.get("/getPost/:id", getPost);

export default router;