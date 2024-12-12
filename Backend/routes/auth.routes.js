import {Router} from "express";
import { getUsers, login, logout, register } from "../controllers/auth.controller.js";
import { loginLimit } from "../middleware/limitRate.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { loginSchema, regisSchema } from "../schema/auth.schema.js";

const router = Router();

router.post("/register", validateSchema(regisSchema), register)
router.post("/login", loginLimit, validateSchema(loginSchema), login)
router.post("/logout", logout)
router.get("/get", getUsers)

export default router;