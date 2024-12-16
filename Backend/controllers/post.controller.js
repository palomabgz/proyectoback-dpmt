import Posts from "../models/Posts.js";

export const getPosts = async (req, res) => {
    try {
        const posts = await Posts.find();
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const getPost = async (req, res) => {
    try {
        // Buscar el post e incluir el usuario relacionado utilizando populate
        const post = await Posts.findById(req.params.id).populate('userId', 'username');

        // Verificar si el post existe
        if (!post) {
            return res.status(404).json({ message: "Post no encontrado" });
        }

        // Si se encuentra el post, responder con la información
        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};