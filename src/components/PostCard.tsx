import Link from "next/link";
import {PostWithAuthor} from "@/lib/post";

interface PostCardProps {
    post: PostWithAuthor;
}

export default function PostCard({ post }: PostCardProps) {
    return (
        <article className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-md transition-shadow">
            <div className={"flex items-center gap-2 mb-3"}>
                <span className={"text-sm text-gray-500"}>  {post.createdAt.toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}</span>
                <span className={"text-gray-300"}>.</span>
                <span className={"text-sm text-gray-500"}>{post.author.name}</span>
            </div>
            <h2 className={"text-xl font-bold text-gray-900 mb-2"}>
                <Link
                    href={`/blog/${post.slug}`}
                    className={"hover:text-blue-600 transition-colors"}
                >
                    {post.title}
                </Link>
            </h2>
            <p className={"text-gray-600 leading-relaxed"}>{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`}
            className={"inline-block mt-4 text-sm font-medium text-blue-600 hover:text-blue-800"}>
                Leer mas...
            </Link>
        </article>
    );
}
