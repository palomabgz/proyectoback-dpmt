import { Router } from "express";
import { addPost, deletePost, getPost, getPosts, getPostsAside } from "../controllers/post.controller.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { postSchema } from "../schema/post.schema.js";
import { validateToken } from "../middleware/validateToken.js";
import { upload } from "../libs/multerImg.js";
import { validateId, validateIdPost } from "../middleware/validateId.js";

const router = Router();

router.get("/getPosts", getPosts);
router.get("/getPostsAside", getPostsAside);
router.get("/getPost/:id", validateId, getPost);

router.post("/addPost", validateToken, upload, validateSchema(postSchema), addPost);
router.delete("/deletePost/:id", validateIdPost, deletePost);

export default router;