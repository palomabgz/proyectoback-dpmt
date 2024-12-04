import Blog from "../model/modelBlog.js"
import crypto from "crypto"
export const getBlogs = async () => {
    const blogs = await Blog.find({isHabilitado: true});
    return blogs
}

export const getBlog = async (id) => {
    const blog = await Blog.findOne({id:id});
    return blog
}
export const getBlogPopulado = async (id) => {
    const blog = await Blog.findOne({id:id}).populate("autor");
    return blog
}
export const createBlog = async (titulo,descripcion,contenido,imagen,autor) => {
    const blog = await Blog.create({id:crypto.randomUUID(),titulo,descripcion,contenido,imagen,autor});
    return blog
}
export const updateBlog = async (id,titulo,descripcion,contenido,imagen) => {
    const blog = await Blog.findOneAndUpdate({id:id},{titulo,descripcion,contenido,imagen})
    
    return blog
}
export const deleteBlog = async (id) => {
    const blog = await Blog.findOneAndUpdate({id:id},{isHabilitado:false});
    return blog
}