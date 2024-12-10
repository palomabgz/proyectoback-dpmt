import Producto from "../model/modelProducto.js";
import crypto from "crypto";

export const getProducts = async () => {
    const productos = await Producto.find({estado:true})
    return productos;
};

export const getProductsFiltrados = async (nombre,precioMin,precioMax,orderby,order) => {
    const filtros = {estado:true};
    if (nombre) {
        filtros.nombre = {$regex: nombre, $options: "i"}
    }
    
    if(precioMin || precioMax){
        filtros.precio = {};
        if(precioMin){
            filtros.precio.$gte = precioMin;
        }
        if(precioMax){
            filtros.precio.$lte = precioMax;
        }
    }
    const sortOptions = {}
    if(orderby){
        sortOptions[orderby]= order === 'desc'?-1:1;
    }

    console.log(filtros);
    const productos = await Producto.find(filtros).sort(sortOptions)
    return productos;
};

export const getProductsPaginado = async (page, limit) => {
    const skip = (page - 1) * limit;
    const productos = await Producto.find({estado:true}).skip(skip).limit(limit)
    const cantidadItems = await Producto.find({estado:true}).countDocuments(); 
    const respuesta = {
        productos: productos,
        cantidadItems: cantidadItems,
        cantidadPaginas: Math.ceil(cantidadItems / limit),
        paginaActual: page
    }
    return respuesta;
};

export const getProduct = async (id) => {
    const producto = await Producto.findOne({id:id})
    return producto;
};

export const createProduct = async (nombre,precio) => {
    const producto = {
        id: crypto.randomUUID(),
        nombre: nombre,
        precio: precio
    };
    const nuevoProducto = await Producto.create(producto);
    return nuevoProducto;
};

export const updateProduct = async(id, nombre,precio) => {
    const producto = await Producto.findOneAndUpdate({id:id}, {nombre:nombre,precio:precio})
    return producto;
};

export const deleteProduct = async (id) => {//actualizar
    const producto = await Producto.findOneAndUpdate({id:id}, {estado:false})
    return producto;
};

export const deleteDefinitiveProduct = async (id) => {//borrar
    const producto = await Producto.findOneAndDelete({id:id})
    return producto;
};
