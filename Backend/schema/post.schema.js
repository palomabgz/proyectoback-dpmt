import { z } from 'zod'

const categorias = ['art', 'videogames', 'tecnologies', 'cinema', 'food'];

export const postSchema = z.object({
    title: z
        .string()
        .nonempty({ message: "El título es requerido" })
        .min(2, { message: "El título debe tener al menos 2 caracteres" })
        .max(100, { message: "El título no debe exceder los 100 caracteres" }),
    descrip: z
        .string()
        .nonempty({ message: "La descripción es requerida" })
        .min(2, { message: "La descripción debe tener al menos 2 caracteres" }),
    cat: z
        .enum(categorias)
        .refine(val => categorias.includes(val), { message: "La categoría es requerida" })
});