import {getPosts} from "@/lib/post";
import PostCard from "@/components/PostCard";

export default async function PostList() {
    const posts = await getPosts();
    if (posts.length === 0) {
        return (
            <p className={"text-center text-gray-500 py-12"}>No hay posts publicados todavia</p>
        )
    }
    return (
        <div className={"grid gap-6"}>
            {posts.map((post) => (
                <PostCard key={post.id} post={post}/>
            ))}
        </div>
    )
}