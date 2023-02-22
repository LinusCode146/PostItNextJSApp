"use client"

import CreatePost from '../components/AddPost'
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import Post from '../components/Post';
import {PostType} from "@/app/types/Posts";

//Fetch all posts


export default function HomePage() {
    const {data, error, isLoading} = useQuery<PostType[]>({
        queryFn: allPosts,
        queryKey: ["posts"],
    })

    if (error) return error
    if (isLoading) return 'Loading...'

    return (
        <main>
            <CreatePost />
            {data?.map((post) =>(
                <Post key={post.id} comments={post.Comment} name={post.user.name} postTitle={post.title} avatar={post.user.image} id={post.id}/>
            ))}
        </main>
    )
}

async function allPosts() {
    const response = await axios.get('/api/posts/getPosts')
    return response.data;
}
