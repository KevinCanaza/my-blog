import {getPosts} from "@/lib/post";
import Link from "next/link";
import PostCard from "@/components/PostCard";

export default  async function Home() {
    const posts = await getPosts();

    return (
        <main className="max-w-4xl mx-auto px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-gray-900 mb-4">My Blog</h1>
                <p className="text-xl text-gray-500">Artículos sobre desarrollo y tecnología.</p>
            </div>
            {posts.length === 0 ? (
                <p className="text-center text-gray-500">No hay posts todavía.</p>
            ) : (
                <>
                    <div className="grid gap-6">
                        {posts.slice(0, 3).map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                    {posts.length > 3 && (
                        <div className="text-center mt-8">
                            <Link href="/blog" className="text-blue-600 hover:underline">
                                Ver todos los posts →
                            </Link>
                        </div>
                    )}
                </>
            )}
        </main>
    )
}