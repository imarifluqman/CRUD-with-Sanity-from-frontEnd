"use client"
import { client } from "@/sanity/lib/client"

import React, { useState } from "react"

function Page() {
    const [message, setMessage] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [file, setFile] = useState<File | null>(null)

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;
        const asset = await client.assets.upload('image', file, {
            filename: file.name, // Optional: Provide a custom filename
        });

        await client.create({
            _type: 'post-form',
            name,
            email,
            message,
            image: {
                _type: 'image',
                asset: {
                    _ref: asset._id,

                }
            }
        })
        setEmail('')
        setMessage('')
        setName('')
        setFile(null)
    };

    return (
        <div className="w-full h-[100vh] flex flex-col justify-center items-center">
            <h2 className="text-2xl text-red-600 font-bold  p-2">Data create</h2>
            <form className="lg:w-[400px] w-[90%] mx-auto flex flex-col gap-4" action="" onSubmit={submit}>
                <input className="w-full border p-2" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input className="w-full border p-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <textarea className="w-full border p-2" name="mesage" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                <input type="file" onChange={(e) => setFile(e.target.files![0])} accept="image/*" />
                <button className="w-full border p-2 bg-black text-white hover:bg-slate-800" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Page