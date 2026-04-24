import { getPostById } from '@/lib/post';
import { getSession } from '@/lib/auth';
import { notFound, redirect } from 'next/navigation';
import EditPostForm from '@/components/EditPostForm';

interface EditPostPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
    const { id } = await params;
    const session = await getSession();
    const post = await getPostById(id);

    if (!post) notFound();
    if (post.authorId !== session!.userId) redirect('/dashboard/posts');

    return (
        <div className="max-w-2xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Editar post</h1>
            <EditPostForm post={post} />
        </div>
    );
}