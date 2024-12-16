import mongoose from "mongoose"

export const validateId = (req, res, next)=>{
    const userId = req.body.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({ message: "El id proporcionado no es valido" });

    next()
}