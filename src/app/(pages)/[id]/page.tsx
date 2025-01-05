'use client'
import { client } from '@/sanity/lib/client';
import React, { useEffect, useState, use } from 'react'
import { useRouter, useParams } from 'next/navigation';
function page() {
    const [message, setMessage] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [name, setName] = useState<string>('')

    const params = useParams();
    const router = useRouter();
    const id = params.id as string;



    useEffect(() => {
        async function getPost() {
            const posts = await client.fetch('*[_type == "contact-form" && _id == $id][0]', { id: id })
            console.log(posts);
            setName(posts.name)
            setEmail(posts.email)
            setMessage(posts.message)
        }
        getPost()
    }, [])




    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await client.patch(id).set({ name, email, message }).commit()

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
                <button className="w-[400px] border p-2 bg-black text-white hover:bg-slate-800" type="submit">Update</button>
            </form>
        </div>
    )
}

export default page