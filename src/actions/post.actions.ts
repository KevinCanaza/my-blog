'use server';
import { prisma } from '@/lib/prisma';
import { PostSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export type PostState = {
    errors?: { title?: string[]; excerpt?: string[]; content?: string[]; general?: string[] };
};

async function getCurrentUser() {
    const token = (await cookies()).get('session')?.value;
    if (!token) return null;
    try {
        return jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; name: string; email: string };
    } catch { return null; }
}

function generateSlug(title: string) {
    return title.toLowerCase().normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-').trim();
}

export async function createPostAction(prevState: PostState, formData: FormData): Promise<PostState> {
    const user = await getCurrentUser();
    if (!user) redirect('/login');

    const validated = PostSchema.safeParse({
        title: formData.get('title'),
        excerpt: formData.get('excerpt'),
        content: formData.get('content'),
        published: formData.get('published') === 'true',
    });
    if (!validated.success) return { errors: validated.error.flatten().fieldErrors };

    const baseSlug = generateSlug(validated.data.title);
    const exists = await prisma.post.findUnique({ where: { slug: baseSlug } });

    await prisma.post.create({
        data: {
            ...validated.data,
            slug: exists ? `${baseSlug}-${Date.now()}` : baseSlug,
            authorId: user.userId,
        },
    });
    revalidatePath('/blog');
    redirect('/dashboard/posts');
}

export async function deletePostAction(postId: string) {
    const user = await getCurrentUser();
    if (!user) redirect('/login');
    await prisma.post.delete({ where: { id: postId, authorId: user.userId } });
    revalidatePath('/blog');
    redirect('/dashboard/posts');
}