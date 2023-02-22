"use client"

import Image from "next/image";
import {signOut} from "next-auth/react";
import Link from "next/link";

type User = {
    image: string,
}

export default function Logged({ image }: User) {
    return (
        <li className='flex gap-8 items-center'>
            <button className='bg-gray-700 text-white text-sm px-6 py-2 rounded-md' onClick={() => signOut()}>Sign Out</button>
            <Link href={'/dashboard'}>
                <Image src={image} width={32} height={32} alt="" priority className='rounded-full' />
            </Link>
        </li>
    )
}