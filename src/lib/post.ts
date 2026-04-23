import { prisma } from '@/lib/prisma';
import { Post, User } from "@/generated/prisma/client"

export type PostWithAuthor = Post & {
    author: Pick<User, 'id' | 'name' | 'email'>;
};

export async function getPosts():  Promise<PostWithAuthor[]>  {
    return prisma.post.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
        include: { author: { select: { id: true, name: true, email: true } } },
    });
}

export async function getPostBySlug(slug: string) {
    return prisma.post.findUnique({
        where: { slug, published: true },
        include: { author: { select: { id: true, name: true, email: true } } },
    });
}

export async function getPostsByAuthor(authorId: string) {
    return prisma.post.findMany({
        where: { authorId },
        orderBy: { createdAt: 'desc' },
        include: { author: { select: { id: true, name: true, email: true } } },
    });
}