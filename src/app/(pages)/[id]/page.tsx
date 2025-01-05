'use client'
import { client } from '@/sanity/lib/client';
import React, { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

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
function Page() {
    const [message, setMessage] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [file, setFile] = useState<File | null>(null)
    const [image, setImage] = useState<data>({} as data)
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;



    useEffect(() => {
        async function getPost() {
            const posts = await client.fetch('*[_type == "post-form" && _id == $id][0]', { id: id })
            setName(posts.name)
            setEmail(posts.email)
            setMessage(posts.message)
            setImage(posts)

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
        await client.patch(id).set({
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
                <div className='w-[400px] flex justify-between items-center'>
                    <input type="file" onChange={(e) => setFile(e.target.files![0])} accept="image/*" />
                    {image.image && <Image src={urlFor(image.image.asset._ref).url()} alt='' width={1000} height={1000} className='w-[100px]' />}
                </div>

                <button className="w-[400px] border p-2 bg-black text-white hover:bg-slate-800" type="submit">Update</button>
            </form>
        </div>
    )
}

export default Page