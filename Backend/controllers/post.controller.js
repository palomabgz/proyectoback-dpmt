import Posts from "../models/Posts.js";

export const getPosts = async (req, res) => {
    const {cat, page = 1, limit = 10} = req.query;  

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    try {
        const skip = (pageNum - 1) * limitNum;

        const query = {};

        if (cat) {
            query.cat = cat;
        }

        const posts = await Posts.find(query).skip(skip).limit(limitNum).sort({ createdAt: -1 });

        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

export const getPostsAside = async (req, res) => {
    const {cat, exclude, page = 1, limit = 5} = req.query;  

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 5);
    try {
        const skip = (pageNum - 1) * limitNum;

        const query = {};

        if (cat) {
            query.cat = cat;
        }

        if (exclude) {
            query._id = { $ne: exclude }; // Excluir el ID especificado
        }

        const posts = await Posts.find(query).skip(skip).limit(limitNum).sort({ createdAt: -1 });

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

export const addPost = async (req, res) => {
    const { title, descrip, cat, userId } = req.body;
    const img = req.file?.path || "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-1273516682.jpg?c=16x9&q=h_833,w_1480,c_fill";
    try {
        const post = new Posts({
            title,
            descrip,
            cat,
            img,
            userId,
        });

        await post.save();

        res.status(201).json({message: "Post creado con éxito"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};