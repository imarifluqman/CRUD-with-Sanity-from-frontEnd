"use client"
import { client } from "@/sanity/lib/client"
import React, { useState } from "react"

function page() {
    const [message, setMessage] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [name, setName] = useState<string>('')

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        await client.create({
            _type: 'contact-form',
            name,
            email,
            message
        })

        setEmail('')
        setMessage('')
        setName('')
    };
    return (
        <div className="w-full h-[100vh] flex flex-col justify-center items-center">
            <h2 className="text-2xl text-red-600 font-bold  p-2">Data create</h2>
            <form className="flex flex-col gap-4" action="" onSubmit={submit}>
                <input className="w-[400px] border p-2" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input className="w-[400px] border p-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <textarea className="w-[400px] border p-2" name="mesage" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                <button className="w-[400px] border p-2 bg-black text-white hover:bg-slate-800" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default page