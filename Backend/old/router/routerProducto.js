import express from "express";
import {
  getProductController,
  getProductsController,
  getProductsFiltradosController,
  updateProductController,
  getProductsPaginadoController,
  createProductController,
  deleteProductController,
  deleteDefinitiveProductController,
} from "../controller/controllerProducto.js";
import { brotliMiddleware } from "../middleware/brotlimiddleware.js";
import {
  validationPostProducto,
  validationPutProducto,
  validationIdProducto,
  validationgetProductoPaginado,
  validationgetProductoFiltrado,
} from "../validations/validationProducto.js";
import { validationMiddleware } from "../middleware/validationmiddleware.js";
import { authMiddleware } from "../middleware/authmiddleware.js";
const routerProducto = express.Router();

routerProducto.get("/", brotliMiddleware, getProductsController); //
routerProducto.get(
  "/paginado",
  brotliMiddleware,
  validationgetProductoPaginado,
  validationMiddleware,
  getProductsPaginadoController
); //
routerProducto.get(
  "/filtrado",
  brotliMiddleware,
  validationgetProductoFiltrado,
  validationMiddleware,
  getProductsFiltradosController
); //
routerProducto.get(
  "/:id",
  validationIdProducto,
  validationMiddleware,
  getProductController
); //

routerProducto.post(
  "/",
  authMiddleware,
  validationPostProducto,
  validationMiddleware,
  createProductController
); //

routerProducto.put(
  "/:id",
  authMiddleware,
  brotliMiddleware,
  validationPutProducto,
  validationMiddleware,
  updateProductController
); //
routerProducto.delete(
  "/:id",
  authMiddleware,
  validationIdProducto,
  validationMiddleware,
  deleteProductController
); //
routerProducto.delete(
  "/definitivo/:id",
  authMiddleware,
  validationIdProducto,
  validationMiddleware,
  deleteDefinitiveProductController
); //

export default routerProducto;
