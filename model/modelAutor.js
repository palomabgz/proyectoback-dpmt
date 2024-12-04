import mongoose from "mongoose";

const autorSchema = new mongoose.Schema({
    id: { type: String, required: true, unique:true },
    isHabilitado: {type: Boolean, default: true},
    nombre: { type: String, required: true },
    bibliografia: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true },
    redSocial: { type: String, required: true },
    fotoPerfil: { type: String, required: true },
})

const Autor = mongoose.model("Autor", autorSchema);

export default Autor;