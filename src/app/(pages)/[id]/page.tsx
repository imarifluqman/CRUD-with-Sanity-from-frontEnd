'use client'
import { client } from '@/sanity/lib/client';
import React, { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation';

function Page() {
    const [message, setMessage] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [file, setFile] = useState<File | null>(null)
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;



    useEffect(() => {
        async function getPost() {
            const posts = await client.fetch('*[_type == "post-form" && _id == $id][0]', { id: id })
            setName(posts.name)
            setEmail(posts.email)
            setMessage(posts.message)
            setFile(posts)
            console.log(posts);


        }
        getPost()
    }, [])




    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        let img;
        if (file) {
            img = await client.assets.upload('image', file, {
                filename: file.name, // Optional: Provide a custom filename
            });
        }



        const result = await client.patch(id).set({
            name,
            email,
            message,
            ...(file && { image: { asset: { _ref: img!._id } } })
        }).commit()

        setEmail('')
        setMessage('')
        setName('')
        router.push('/data-fetch')
    };

    return (
        <div className='w-full h-[100vh] flex flex-col justify-center items-center'>
            <h1 className='text-2xl text-red-600 font-bold mb-4'>ID# {id}</h1>
            <form className="flex flex-col gap-4" action="" onSubmit={submit}>
                <input className="w-[400px] border p-2" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input className="w-[400px] border p-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <textarea className="w-[400px] border p-2" name="mesage" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                <input type="file" onChange={(e) => setFile(e.target.files![0])} accept="image/*" />
                <button className="w-[400px] border p-2 bg-black text-white hover:bg-slate-800" type="submit">Update</button>
            </form>
        </div>
    )
}

export default Page