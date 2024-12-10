import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    id: { type: String, required: true, unique:true },
    titulo:{ type: String, required: true },
    descripcion:{ type: String, required: true},
    contenido:{ type: String, required: true},
    imagen:{ type: String, required: true },
    fechaPublicacion:{ type: Date, default: new Date },
    isHabilitado: {type: Boolean, default: true},
    autor: { type: mongoose.Schema.Types.ObjectId, ref: 'Autor', required: true },
})

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;