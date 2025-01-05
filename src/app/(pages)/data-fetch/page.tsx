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
        console.log(posts);

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
            <table className="w-[90%] mx-auto border">
                <thead className='border bg-slate-600 text-white'>
                    <tr className='border'>
                        <th className='border'>Image</th>
                        <th className='border'>Name</th>
                        <th className='border'>Email</th>
                        <th className='border'>Message</th>
                        <th className='border'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post: data) => (
                        <tr className='border' key={post._id}>
                            <td className='border'>
                                <Image src={urlFor(post.image).url()} alt="" width={100} height={100} className='w-20 h-20' />
                            </td>
                            <td className='border'>{post.name}</td>
                            <td className='border'>{post.email}</td>
                            <td className='border'>{post.message}</td>
                            <td className='border'>
                                <Link href={`/${post._id}`} className='p-2 mx-2 bg-green-600 text-white hover:bg-green-800'>Update</Link>
                                <button className=' p-2 bg-red-600 text-white hover:bg-red-800' onClick={() => handleDelete(post._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

