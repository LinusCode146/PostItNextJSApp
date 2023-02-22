"use client"

import React, {useState, ChangeEvent} from "react";
import axios, {AxiosError} from "axios";
import toast from "react-hot-toast";

import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'

export default function CreatePost() {
    const [title, setTitle] = useState('')
    const [isDisabled, setIsDisabled] = useState(false);
    const queryClient = useQueryClient()
    let toastPostID : string

    //Create a post
    const { mutate } = useMutation(
        async (title : string) => await axios.post('/api/posts/addPost', { title }),
        {
            onError: (error) => {
                if(error instanceof AxiosError){
                    toast.error(error?.response?.data.message, { id: toastPostID })
                }
                setIsDisabled(false);
            },
            onSuccess: (data) => {
                toast.success("Post has been made !", { id: toastPostID })
                queryClient.invalidateQueries(["posts"]).then(r => null)
                setTitle('')
                setIsDisabled(false)
            },
        }
    )

    const submitPost = async (e: React.FormEvent) => {
        e.preventDefault();
        toastPostID = toast.loading("Creating your post", { id: toastPostID })
        setIsDisabled(true);
        mutate(title)
    }

    return (
        <form onSubmit={submitPost} className='bg-white my-8 p-8 rounded-md'>
            <div className="flex flex-col my-4">
                <textarea className="9/10 p-4 text-lg rounded-md my-2 bg-gray-200" placeholder="What's on your mind?"
                          name="title" value={title} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setTitle(e.target.value)}>

                </textarea>
            </div>

            <div className='flex items-center justify-between gap-2'>
                <p className={`font-bold text-sm ${title.length > 300 ? "text-red-700" : "text-gray-700"}`}>{`${title.length}/300`}</p>
                <button type="submit" className='text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25' disabled={isDisabled}>Create a post</button>
            </div>
        </form>
    )
}