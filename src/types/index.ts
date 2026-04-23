export interface Post {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage?: string;
    published: boolean;
    createdAt: string;
    author:{
        id: string;
        name: string;
        email: string;
    }
}

export interface Autor {
    id: string;
    name: string;
    email: string;
}