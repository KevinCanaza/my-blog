import { getSession } from '@/lib/auth';
import { getPostsByAuthor } from '@/lib/post';
import { deletePostAction } from '@/actions/post.actions';
import Link from 'next/link';

export default async function DashboardPostsPage() {
    const session = await getSession();
    const posts = await getPostsByAuthor(session!.userId);

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Mis Posts</h1>
                <Link href="/dashboard/posts/new" className="bg-black text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-800">
                    + Nuevo post
                </Link>
            </div>

            {posts.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
                    <p className="text-gray-500 mb-4">No tienes posts todavía</p>
                    <Link href="/dashboard/posts/new" className="text-blue-600 hover:underline text-sm">
                        Crea tu primer post →
                    </Link>
                </div>
            ) : (
                <div className="divide-y divide-gray-200 border border-gray-200 rounded-lg bg-white">
                    {posts.map((post) => (
                        <div key={post.id} className="flex items-center justify-between p-4">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      post.published
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                  }`}>
                    {post.published ? 'Publicado' : 'Borrador'}
                  </span>
                                    <span className="text-xs text-gray-400">
                    {post.createdAt.toLocaleDateString('es-ES')}
                  </span>
                                </div>
                                <p className="font-medium text-gray-900 truncate">{post.title}</p>
                            </div>
                            <div className="flex items-center gap-3 ml-4">
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="text-sm text-gray-500 hover:text-gray-900"
                                    target="_blank"
                                >
                                    Ver
                                </Link>
                                <Link
                                    href={`/dashboard/posts/${post.id}/edit`}
                                    className="text-sm text-blue-600 hover:text-blue-800"
                                >
                                    Editar
                                </Link>
                                <form action={deletePostAction.bind(null, post.id)}>
                                    <button type="submit" className="text-sm text-red-500 hover:text-red-700">
                                        Eliminar
                                    </button>
                                </form>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}