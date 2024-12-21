import Posts from "../models/Posts.js";

// funcion que obtiene los post
export const getPosts = async (req, res) => {
    try {
        const posts = await Posts.find();
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

// funcion que obtiene un post
export const getOnePost = async (req, res) => {
    try {
        const posts = await Posts.findById();
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}