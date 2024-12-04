import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
        id: { type: String, required: true },
        nombre: { type: String, required: true },
        precio: { type: Number,default : 0 },
        estado: { type: Boolean, default: true },
    });
    
const Producto = mongoose.model("Producto", productoSchema);

export default Producto;