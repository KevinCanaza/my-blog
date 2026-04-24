import { getSession } from '@/lib/auth';
import { getPostsByAuthor } from '@/lib/post';
import Link from 'next/link';

export default async function DashboardPage() {
    const session = await getSession();
    const posts = await getPostsByAuthor(session!.userId);

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-500 mt-1">Bienvenido, {session!.name}</p>
                </div>
                <Link
                    href="/dashboard/posts/new"
                    className="bg-black text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-800"
                >
                    + Nuevo post
                </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="border border-gray-200 rounded-lg p-4 bg-white">
                    <p className="text-sm text-gray-500">Total posts</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{posts.length}</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-white">
                    <p className="text-sm text-gray-500">Publicados</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                        {posts.filter(p => p.published).length}
                    </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-white">
                    <p className="text-sm text-gray-500">Borradores</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                        {posts.filter(p => !p.published).length}
                    </p>
                </div>
            </div>

            <Link href="/dashboard/posts" className="text-sm text-blue-600 hover:underline">
                Ver todos mis posts →
            </Link>
        </div>
    );
}