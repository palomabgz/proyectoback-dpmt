import { Router } from "express";
import { getPosts,getOnePost } from "../controllers/post.controller.js";

const router = Router();

router.get("/getPosts", getPosts);
router.get("/getOnePost", getOnePost);

export default router;