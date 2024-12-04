import express from "express";
import { LoginUserController, RegisterUserController, RefreshTokenController } from "../controller/controllerUsuario.js";

const routerUsuario = express.Router();

routerUsuario.post("/login", LoginUserController);
routerUsuario.post("/register", RegisterUserController);
routerUsuario.post("/token", RefreshTokenController);

export default routerUsuario;