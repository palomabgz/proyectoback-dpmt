import { getAutor,getsAutores, postAutor, putAutor, deleteAutor } from "../service/serviceAutor.js"

export const getsAutoresController = async (req, res) => {
    try {
        const autores = await getsAutores();
        if(autores.length === 0){ 
            return res.status(400).json({status: "error", menssage: "autores no encontrados", data:{}});
        }
        return res.status(200).json({status: "success", menssage: "autores obtenidos", data:autores});
    } catch (error) {
        return res.status(500).json({status: "error", menssage: "error en el servidor", data:{}});
    }
}
export const getAutorController = async (req, res) => {
    try {
        const id = req.params.id;
        const autor = await getAutor(id);
        if(!autor){
            return res.status(400).json({status: "error", menssage: "autor no encontrado", data:{}});
        }
        return res.status(200).json({status: "success", menssage: "autor obtenido", data:autor});
    } catch (error) {
        return res.status(500).json({status: "error", menssage: "error en el servidor", data:{}});
    }
}
export const postAutorController = async (req, res) => {
    try {
        const {nombre,bibliografia,fechaNacimiento,redSocial,fotoPerfil} = req.body;
        
        if (!nombre || !bibliografia || !fechaNacimiento || !redSocial || !fotoPerfil) {
            return res.status(400).json({status: "error", menssage: "faltan datos", data:{}});
        }
        
        const autor = await postAutor(nombre,bibliografia,fechaNacimiento,redSocial,fotoPerfil);
        
        if(autor){
            return res.status(201).json({status: "success", menssage: "autor creado", data:autor});
        }else{
            return res.status(400).json({status: "error", menssage: "autor no creado", data:{}});
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", menssage: "error en el servidor", data:{}});
    }
}
export const putAutorController = async (req, res) => {
    try {
        const id = req.params.id;
        const {nombre,bibliografia,fechaNacimiento,redSocial,fotoPerfil} = req.body;

        if (!nombre || !bibliografia || !fechaNacimiento || !redSocial || !fotoPerfil) {
            return res.status(400).json({status: "error", menssage: "faltan datos", data:{}});
        }

        let autor = await putAutor(id,nombre,bibliografia,fechaNacimiento,redSocial,fotoPerfil);

        if (autor) {
            autor = await getAutor(id);
            return res.status(200).json({status: "success", menssage: "autor actualizado", data:autor});
        } else {
            return res.status(400).json({status: "error", menssage: "autor no actualizado", data:{}});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", menssage: "error en el servidor", data:{}});
    }
}
export const deleteAutorController = async (req, res) => {
    try {
        const id = req.params.id;
        let autor = await deleteAutor(id);
        if (autor) {
            autor = await getAutor(id);
            return res.status(200).json({status: "success", menssage: "autor eliminado", data:autor});
        }else{
            return res.status(400).json({status: "error", menssage: "autor no eliminado", data:{}});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", menssage: "error en el servidor", data:{}});
    }
}