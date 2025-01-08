"use client";
import { client } from "@/sanity/lib/client";
import { useState } from "react";

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
    _id: string;
    _type: string;
}

function page() {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    async function uploadProducts() {
        setIsLoaded(true);
        const response = await fetch('https://fakestoreapi.com/products/');
        const data: Product[] = await response.json();
        console.log(data);

        data.map(async (product) => {
            const response = await fetch(product.image);
            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const asset = await client.assets.upload('image', buffer);

            const sanityData = {
                ...product,
                image: {
                    _type: 'image',
                    asset: {
                        _ref: asset._id,
                        _type: 'reference'
                    }
                },
                _id: product.id.toString(),
                _type: 'products'
            }
            return client.createOrReplace(sanityData);
        })

        setIsLoaded(false);
    }




    async function deleteData() {
        const query = '*[_type == "products"]';
        const posts = await client.fetch(query);

        posts.map((pos: Product) => {
            client.delete(pos._id)
        })
    }



    return (
        <div className="w-full h-[100vh] flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold text-center">API to sanity</h1>
            <div className="flex mt-5">

                <button className="border mr-5 py-3 px-4 border-red-700 rounded hover:bg-red-700 hover:text-white " onClick={uploadProducts}>{isLoaded ? 'loading...' : 'upload'}</button>
                <button className="border mr-5 py-3 px-4 border-red-700 rounded hover:bg-red-700 hover:text-white " onClick={deleteData}>delete All</button>
            </div>
        </div>
    )
}

export default page