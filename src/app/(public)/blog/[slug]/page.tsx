import {getPostBySlug, getPosts} from "@/lib/post";
import Link from "next/link";
import {notFound} from "next/navigation";
import LikeButton from "@/components/LikeButton";

interface PostPageProps {
    params : Promise<{ slug : string }>;
}
export const revalidate = 300;

export default async function PostPage({ params }:PostPageProps) {
    const { slug } = await  params;
    const post = await getPostBySlug(slug)
    if (!post) {
        notFound();
    }
    if (!post) return null;
  return (
    <main className={"min-h-screen mx-auto px-8 py-12"}>
        <Link href={"/blog"} className={"text-sm text-gray-500 hover:text-gray-900 mb-8 inline-block"}>Volver al blog</Link>
        <div className="flex items-center gap-2 mb-4">
            <span className={"text-sm text-gray-500"}>{post.createdAt.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })}</span>
            <span className={"text-gray-300"}>.</span>
            <span className={"text-sm font-medium text-gray-700"}>{post.author.name}</span>
        </div>
        <h1 className={"text-4xl font-bold text-gray-900 mb-6"}>{post.title}</h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8 border-l-4 border-blue-500 pl-4">
            {post.excerpt}
        </p>
        <div className="prose max-w-none text-gray-700 leading-relaxed">
            {post.content}
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
            <LikeButton postId={post.id} initialLikes={0}/>
        </div>

    </main>
  );
}
export async function generateStaticParams() {
    const posts = await getPosts();
    return posts.map((post) => ({ slug: post.slug }));
}
