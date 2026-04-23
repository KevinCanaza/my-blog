function BlogLoading() {
    return (
        <div className="max-w-4xl mx-auto px-8 py-12">
            <div className="h-9 w-24 bg-gray-200 rounded animate-pulse mb-8" />
            <div className="grid gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex gap-2 mb-3">
                            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                        </div>
                        <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse mt-1" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogLoading;
