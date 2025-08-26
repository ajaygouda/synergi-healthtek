"use client";
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { useState } from 'react';
import { Count } from '@/components/count';
import { useCustomer } from '@/api/context/customer-context'
import Link from 'next/link'
const PORT = process.env.NEXT_PUBLIC_STRAPI_API_URL;
export const ProductDetails = ({ product }) => {
    const [qty, setQty] = useState(1);
    const { handleAddtocart } = useCustomer();

    const handleCount = (type) => {
        if (type === "inc") {
            setQty((prev) => prev + 1)
        }
        else {
            setQty((prev) => {
                if (prev === 1) {
                    return prev
                }
                return prev - 1
            })
        }
    }

    return (
        <div className="container-1256">
            <div className="flex flex-col gap-10 my-5 dark:text-gray-200">
                <nav className="flex" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <li className="inline-flex items-center">
                            <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-white">
                                <svg className="w-3 h-3 me-2.5 fill-current" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                </svg>
                                Home
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1 fill-current" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                </svg>
                                <Link href="/products" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-200 dark:hover:text-white">Products</Link>
                            </div>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1 fill-current" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                </svg>
                                <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-300">{product.title}</span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>
            <div className="flex flex-col md:flex-row gap-10">
                <div className="bg-white dark:border-0 flex items-center justify-center w-[50%] rounded-[16px] h-[520px] border border-gray-200 p-4">
                    {product.images.map((img, index) => (
                        <img
                            key={index}
                            src={img.url}
                            alt={`Product Image ${index + 1}`}
                            className="mb-2 rounded h-full"
                        />
                    ))}
                </div>

                <div className="w-[50%] flex flex-col justify-between">
                    <div className='flex flex-col justify-between h-[520px]'>
                        <div>
                            <p className='dark:text-gray-200 uppercase text-sm font-bold text-gray-400 tracking-widest'>{product.category.name}</p>
                            <h1 className="dark:text-gray-100 font-goodTime text-[24px] text-gray-900 mt-2">{product.title}</h1>
                            <p className="text-gray-500 dark:text-gray-300 mb-4"><b>Description:</b> {product.description}</p>
                            <h1 className="text-[36px] font-bold text-gray-900 dark:text-gray-100">${product.price}</h1>
                        </div>
                        <div className="flex flex-col gap-10">
                            <div className="flex gap-4">
                                <img className="h-18 dark:filter dark:grayscale dark:invert" src="../../iso_certfication.png" />
                                <img className="h-18 dark:filter dark:grayscale dark:invert" src="../../iso_icon.png" />
                            </div>
                            <div className='flex gap-3'>
                                <Count handleCount={handleCount} qty={qty} />
                                <button onClick={() => handleAddtocart({ ...product, qty: qty, totalPrice: product.price * qty })} className="w-full cursor-pointer text-white bg-secondary-400 hover:bg-secondary transition font-bold rounded-[8px] text-base px-10 py-4 text-center">Add to Cart</button>
                                <div className='flex h-14 bg-gray-100 rounded-[8px]'>
                                    <button type="button" className="cursor-pointer hover:bg-gray-100 justify-center h-14 w-14 transition text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-700 dark:hover:bg-gray-100 font-medium rounded-[8px] text-sm p-3 text-center inline-flex items-center group">
                                        <svg className="fill-current" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M19.66 3.99c-2.64-1.8-5.9-.96-7.66 1.1-1.76-2.06-5.02-2.91-7.66-1.1-1.4.96-2.28 2.58-2.34 4.29-.14 3.88 3.3 6.99 8.55 11.76l.1.09c.76.69 1.93.69 2.69-.01l.11-.1c5.25-4.76 8.68-7.87 8.55-11.75-.06-1.7-.94-3.32-2.34-4.28M12.1 18.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05"></path></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-10 my-10 dark:text-gray-200">
                        <BlocksRenderer content={product.information} />
                    </div>
                </div>
            </div>

        </div>
    )
}