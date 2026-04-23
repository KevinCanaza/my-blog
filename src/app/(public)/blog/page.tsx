import { Suspense } from "react";
import BlogLoading from "@/app/(public)/blog/loading";
import PostList from "@/components/PostList";
import {getPosts} from "@/lib/post";
export const revalidate = 60;
export default function BlogPage() {
    return (
        <main className="max-w-4xl mx-auto px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Blog</h1>
            <Suspense fallback={<BlogLoading/>}>
                <PostList/>
            </Suspense>
        </main>
    );
}