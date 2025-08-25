"use client"
import { useState } from "react";
import Product from '@/components/product';

export const ProductsClient = ({ products, categories }) => {
    const [rowData, setRowData] = useState(products);
    const [active, setActive] = useState(0);

    const HandleFilter = (key) => {
        setActive(key);
        setRowData(
            key !== 0 ? products.filter((item) => item.category.id === key) : products
        )
    }

    return (
        <div className="container-1256 py-5 md:py-10 px-4 md:px-0">
            <div className="mb-4 border-b border-gray-200 dark:border-gray-500">
                <ul className="flex gap-6 flex-wrap -mb-px text-sm font-medium text-center" data-tabs-toggle="#default-tab-content" role="tablist">
                    <li role="presentation" className={active === 0 ? "border-b-[4px] border-primary-500" : ""}>
                        <button onClick={() => HandleFilter(0)} className={`cursor-pointer text-[16px] inline-block py-4 rounded-t-lg ${active === 0 ? "text-primary-500" : "text-gray-500 dark:text-gray-200"}`} id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">All Products</button>
                    </li>
                    {categories.map((category, index) => (
                        <li key={index} role="presentation" className={active === category.id ? "border-b-[4px] border-primary-500" : ""}>
                            <button onClick={() => HandleFilter(category.id)} className={`cursor-pointer text-[16px] inline-block py-4 rounded-t-lg ${active === category.id ? "text-primary-500" : "text-gray-500 dark:text-gray-200"}`} id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">{category.name}</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='flex flex-wrap flex-col md:flex-row gap-4 md:gap-6 mt-5 md:mt-10'>
                {rowData.map((product, index) => (
                    <Product key={index} type="border" product={product} />
                ))}
            </div>
        </div>
    )
}
