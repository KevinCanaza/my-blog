"use client"
import {useEffect, useState} from "react";

interface LikeButtonProps {
    postId: string;
    initialLikes?: number;
}
export default function LikeButton({ postId, initialLikes = 0 }: LikeButtonProps) {
    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(false);
    const storageKey = `liked-${postId}`;

    useEffect(() => {
        const savedLiked = localStorage.getItem(storageKey) === 'true';
        setLiked(savedLiked);
        if (savedLiked) setLikes(initialLikes + 1);
    }, [storageKey, initialLikes]);

    function handleLike() {
        const newLiked = !liked;
        setLiked(newLiked);
        setLikes(newLiked ? likes + 1 : likes - 1);
        localStorage.setItem(storageKey, String(newLiked));
    }

    return (
        <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 rounded-full border transition-all 
            ${
                liked
                ? "bg-red-50 border-red-300 text-red-600"
                    : "bg-white border-gray-300 text-gray-600 hover:border-gray-400"
            } `}
        >
            <span>{liked ? '❤️' : '🤍'}</span>
            <span className={"text-sm font-medium"}>{likes}</span>

        </button>
    )
}