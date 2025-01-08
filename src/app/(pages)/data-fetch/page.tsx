"use client"
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


type data = {
    email: string,
    message: string,
    name: string,
    _createdAt: string,
    _id: string,
    _rev: string,
    _updatedAt: string,
    _type: string,
    image: {
        _type: string,
        asset: {
            _ref: string,
            _type: string
        }
    }

}



export default function Page() {
    const [posts, setPosts] = useState<data[]>([])


    async function getPost() {
        const query = '*[_type == "post-form"] | order(_createdAt desc)';
        const posts = await client.fetch(query);

        setPosts(posts)
    }





    useEffect(() => {
        getPost()

    }, [])




    const handleDelete = async (id: string) => {
        await client.delete(id)
        getPost()
    }




    return (
        <div className="w-full h-[100vh] flex flex-col  items-center">

            <h2 className='text-2xl text-red-600 font-bold p-2'>Data Fatch</h2>

            <div className=' flex flex-wrap justify-center items-start gap-4'>
                {posts.map((post: data) => (
                    <div className='lg:w-[400px] w-[90%]  border' key={post._id}>
                        <div className=''>
                            <Image src={urlFor(post.image).url()} alt="" width={1000} height={1000} className='w-full' />
                        </div>
                        <div className=''>Name : {post.name}</div>
                        <div className=''>Email : {post.email}</div>
                        <div className=''>Message : {post.message}</div>
                        <div className=''>
                            <Link href={`/${post._id}`} className='p-2 mx-2 bg-green-600 text-white hover:bg-green-800'>Update</Link>
                            <button className=' p-2 bg-red-600 text-white hover:bg-red-800' onClick={() => handleDelete(post._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

