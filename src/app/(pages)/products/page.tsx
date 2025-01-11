"use client";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { useEffect, useState } from "react";

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

function Page() {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [products, setProducts] = useState<Product[]>([]);
   
    async function uploadProducts() {
        setIsLoaded(true);

        try {
            const response = await fetch('https://fakestoreapi.com/products/');
            const data: Product[] = await response.json();
          const promiseAll =  data.map(async (product) => {
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
                };

                return client.createOrReplace(sanityData);
            });
            await Promise.all(promiseAll);

        } catch (error) {
            console.error('Error uploading products:', error);
        } finally {
            setIsLoaded(false);
        }
    }

    async function deleteData() {
        const query = '*[_type == "products"]';
        const posts = await client.fetch(query);
        posts.map((pos: Product) => {
            client.delete(pos._id)
        })
        setProducts([]);
    }


    useEffect(() => {
        const query = '*[_type == "products"]';
        client.fetch(query).then((data: Product[]) => {
            setProducts(data);
        });
    }, [products]);


    return (
        <div>
            <div className="w-full h-[90vh] bg-slate-300 flex flex-col justify-center items-center">
                <h1 className="text-3xl font-bold text-center">API to sanity</h1>
                <div className="flex mt-5">
                    <button className="border mr-5 py-3 px-4 border-red-700 rounded hover:bg-red-700 hover:text-white " disabled={isLoaded} onClick={uploadProducts}>{isLoaded ? 'loading...' : 'upload'}</button>
                    <button className="border mr-5 py-3 px-4 border-red-700 rounded hover:bg-red-700 hover:text-white " onClick={deleteData}>delete All</button>
                </div>
            </div>
            {products.length > 0 && <div className="w-full flex flex-wrap justify-evenly items-center gap-4 mt-5  ">
                {products?.map((product) => (
                    <div key={product.id} className="w-[200px] h-[300px] bg-white shadow-lg rounded-lg flex flex-col items-center">
                        <div className="w-full h-[200px] flex justify-center items-center">
                            <img src={urlFor(product.image).url()} alt={product.title} className="w-full h-full object-contain" />
                        </div>
                        <div className="p-4 text-center">
                            <h2 className="font-semibold">{product.title.slice(0, 20)}</h2>
                            <p className="text-gray-500">${product.price}</p>
                        </div>
                    </div>
                ))}
            </div>}
        </div>

    )
}

export default Page
