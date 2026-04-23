"use client"
import {useState} from "react";

interface LikeButtonProps {
    initialLikes?: number;
}
export default function LikeButton({ initialLikes = 0 }: LikeButtonProps) {
    const [likes,setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(false);

    function handleLike() {
        if (liked) {
            setLikes(likes - 1);
            setLiked(false);
        }else{
            setLikes(likes + 1);
            setLiked(true);
        }

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