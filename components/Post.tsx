"use client"

import Image from 'next/image'
import Link from "next/link";

// @ts-ignore
export default function Post({avatar, comments, name, postTitle, id}) {
    return (
        <div className='bg-white my-8 p-8 rounded-lg'>
            <div className='flex items-center gap-2 '>
                <Image src={avatar} width={32} height={32} alt="avatar" className='rounded-full' />
                <h3 className='font-bold text-gray-700'>{name}</h3>
            </div>
            <div className='my-8'>
                <p className='break-all'>{postTitle}</p>
            </div>
            <div className='flex gap-4 cursor-pointer items-center'>
                <Link href={`/post/${id}`}>
                    <p className='text-sm font-bold text-gray-700'>{comments.length} Comments</p>
                </Link>
            </div>
        </div>
    )
}