import { Router } from "express";
import { addPost, getPost, getPosts, getPostsAside } from "../controllers/post.controller.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { postSchema } from "../schema/post.schema.js";
import { validateId } from "../middleware/validateId.js";

const router = Router();

router.get("/getPosts", getPosts);
router.get("/getPostsAside", getPostsAside);
router.get("/getPost/:id", getPost);
router.post("/addPost", validateId, validateSchema(postSchema), addPost);

export default router;