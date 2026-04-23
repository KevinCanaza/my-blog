import {z} from "zod";

export const RegisterSchema = z.object({
    name: z
        .string()
        .min(2,'El nombre debe tener al menos 2 caracteres')
        .max(50,"El nombre no puede tener mas de 50 caracteres"),
    email: z
        .string()
        .email("Email valido"),
    password: z
        .string()
        .min(8,"La constrasena debe tener al menos 8 caracteres")
})

export const LoginSchema = z.object({
    email: z.string().email("Email valido"),
    password: z.string().min(1,"La contrasena es requeridad")
})

export const PostSchema = z.object({
    title: z.string().min(1,'El titulo debe tener al menos 5 caracteres')
        .max(100, "El titulo no puede tener mas de 100 caracteres"),
    excerpt: z.string()
        .min(10,"El resumen debe tener al menos 10 caracteres")
        .max(300,"El resumen no piuede tener mas de 300 caracteres"),
    content: z.string()
        .min(50, "el contenido debo tener al menos 50 caracteres"),
    publisher: z.boolean().default(false)
})

export type RegisterInput = z.infer<typeof RegisterSchema>
export type LoginInput = z.infer<typeof LoginSchema>
export type PostInput = z.infer<typeof PostSchema>