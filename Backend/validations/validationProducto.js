import { body, query, param } from "express-validator";
export const validationPostProducto = [
    body("nombre").isString().withMessage("El nombre debe ser un texto").isLength({min:1,max:100}).withMessage("El nombre debe tener entre 1 y 100 caracteres"),
    body("precio").isNumeric().withMessage("El precio debe ser un número"),
];
export const validationPutProducto = [
    body("nombre").isString().withMessage("El nombre debe ser un texto").isLength({min:1,max:100}).withMessage("El nombre debe tener entre 1 y 100 caracteres"),
    body("precio").isNumeric().withMessage("El precio debe ser un número"),
    param("id").isUUID().withMessage("El id debe ser un UUID"),
];
export const validationIdProducto = [
    param("id").isUUID().withMessage("El id debe ser un UUID"),
]
export const validationgetProductoPaginado = [ 
    query("limit").optional().isInt().withMessage("El límite debe ser un número"),
    query("page").optional().isInt().withMessage("La página debe ser un número"),
]
export const validationgetProductoFiltrado = [
    query("nombre").optional().isString().withMessage("El nombre debe ser un texto").isLength({min:1,max:100}).withMessage("El nombre debe tener entre 1 y 100 caracteres"),
    query("precioMin").optional().isNumeric().withMessage("El precioMin debe ser un número"),
    query("precioMax").optional().isNumeric().withMessage("El precioMax debe ser un número"),
    query("orderby").optional().isIn(["nombre","precio"]).withMessage("El orderby debe ser nombre o precio"),
    query("order").optional().isIn(["asc","desc"]).withMessage("El order debe ser asc o desc"),
]