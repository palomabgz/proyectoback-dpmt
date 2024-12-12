import { Router } from "express";
import { getPosts } from "../controllers/post.controller.js";

const router = Router();

router.get("/getPosts", getPosts);

export default router;