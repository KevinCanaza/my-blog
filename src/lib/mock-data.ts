import {Post} from "@/types";

export async function getPosts(): Promise<Post[]> {
    await new Promise(resolve => setTimeout(resolve, 1500));

    return [
        {
            id: '1',
            title: 'Aprendiendo Next.js 16',
            slug: 'aprendiendo-nextjs-16',
            excerpt: 'Todo lo que necesitas saber sobre el nuevo Next.js 16 y sus características.',
            content: 'Contenido completo del post...',
            published: true,
            createdAt: '2024-01-15',
            author: { id: '1', name: 'Juan Pérez', email: 'juan@blog.com' },
        },
        {
            id: '2',
            title: 'Prisma ORM con TypeScript',
            slug: 'prisma-orm-typescript',
            excerpt: 'Cómo usar Prisma para conectar tu Next.js app a una base de datos.',
            content: 'Contenido completo del post...',
            published: true,
            createdAt: '2024-01-20',
            author: { id: '1', name: 'Juan Pérez', email: 'juan@blog.com' },
        },
        {
            id: '3',
            title: 'Autenticación con JWT',
            slug: 'autenticacion-jwt',
            excerpt: 'Implementando login seguro con JWT y cookies HTTP-only.',
            content: 'Contenido completo del post...',
            published: true,
            createdAt: '2024-01-25',
            author: { id: '2', name: 'María García', email: 'maria@blog.com' },
        },
    ]
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    await new Promise(resolve => setTimeout(resolve, 800));
    const posts = await getPosts();
    return posts.find((p) => p.slug === slug)?? null;
}