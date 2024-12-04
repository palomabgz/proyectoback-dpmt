import express from "express";
import { postAutorController,putAutorController,getAutorController,deleteAutorController,getsAutoresController } from "../controller/controllerAutor.js";
const routerAutor = express.Router();

routerAutor.get("/", getsAutoresController)
routerAutor.get("/:id", getAutorController)
routerAutor.post("/", postAutorController)
routerAutor.put("/:id", putAutorController)
routerAutor.delete("/:id", deleteAutorController)

export default routerAutor;