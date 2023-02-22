"use client"


import Post from "@/components/Post";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AddComment from "@/components/AddComment";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Comment } from "@/app/types/Comment";

//Fetch all the post details
const fetchDetails = async (slug: string) => {
    const response = await axios.get(`/api/posts/${slug}`)
    return response.data;
}

type URL = {
    params: {
        slug: string
    }
}

export  default function PostDetail(url: URL) {

    const { data, isLoading } = useQuery({
        queryFn: () => fetchDetails(url.params.slug),
        queryKey: ['detail-post'],
    })

    if(isLoading) return <h1>Loading ...</h1>
    console.log(data)


    // @ts-ignore
    return (
        <div>
            <Post id={data?.id} name={data.user.name} avatar={data.user.image} postTitle={data.title} comments={data.Comment} />
            <AddComment id={data?.id} />
            {data?.Comment?.map((comment: Comment) => (
                <motion.div
                    animate={{ opacity: 1, scale: 1 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    transition={{ ease: "easeOut" }}
                    className="my-6 bg-white p-8 rounded-md"
                    key={comment.id}
                >
                    <div className="flex items-center gap-2">
                        <Image
                            width={24}
                            height={24}
                            src={comment.user?.image}
                            alt="avatar"
                            className='rounded-full'
                        />
                        <h3 className="font-bold">{comment?.user?.name}</h3>
                        <h2 className="text-sm">{comment.createdAt}</h2>
                    </div>
                    <div className="py-4">{comment.message}</div>
                </motion.div>
            ))}
        </div>
    )
}
