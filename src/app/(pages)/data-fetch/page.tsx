"use client"
import { client } from '@/sanity/lib/client'
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
    _type: string

}

export default function page() {
    const [posts, setPosts] = useState<data[]>([])

    async function getPost() {
        console.log('getPost');

        const query = '*[_type == "contact-form"]'

        const posts = await client.fetch(query)
        setPosts(posts)


    }





    useEffect(() => {
        console.log('useEffect');
        getPost()
    }, [])




    const handleDelete = async (id: string) => {
        const result = await client.delete(id)
        getPost()
    }



    return (
        <div className="w-full h-[100vh] flex flex-col  items-center">
            <h2 className='text-2xl text-red-600 font-bold p-2'>Data Fatch</h2>
            <table className="w-[90%] mx-auto border">
                <thead className='border bg-slate-600 text-white'>
                    <tr className='border'>
                        <th className='border'>Name</th>
                        <th className='border'>Email</th>
                        <th className='border'>Message</th>
                        <th className='border'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post: any) => (
                        <tr className='border' key={post._id}>
                            <td className='border'>{post.name}</td>
                            <td className='border'>{post.email}</td>
                            <td className='border'>{post.message}</td>
                            <td className='border'>
                                <Link href={`/${post._id}`} className='border p-2 bg-green-600 text-white hover:bg-green-800'>Update</Link>
                                <button className='border p-2 bg-red-600 text-white hover:bg-red-800' onClick={() => handleDelete(post._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

