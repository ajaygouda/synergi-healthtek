"use client";
import { useEffect, useState } from "react";
import Product from '@/components/product';
import CommonService from "@/api/common.service";

export const FeaturedProduct = ({ sectionTitle, featuredCategories }) => {
    const [rawData, setRawData] = useState([]);
    const [rowData, setRowData] = useState([]);
    const [active, setActive] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await CommonService.getProducts();
                setRawData(products.data)
                setRowData(products.data); 
            } catch (err) {
                console.error("Error fetching products:", err);
            }
        };

        fetchProducts();
    }, []);

    const HandleFilter = (event) => {
        let key = +event.target.value;
        setActive(key);
        setRowData(
            key !== 0 ? rawData.filter((item) => item.category.id === key) : rawData
        )
    }

    return (
        <div className='bg-gray-100 dark:bg-gray-700'>
            <div className='container-1256 px-4 md:px-0 py-10 md:py-20'>
                <div className="flex text-center md:text-left flex-col md:flex-row justify-between md:items-end gap-4">
                    <h1 className="font-goodTime w-[250px] text-[28px] md:text-[36px] leading-[32px] md:leading-[40px]">
                        {sectionTitle}
                    </h1>
                    <div className="shrink-0">
                        <select onChange={(e) => HandleFilter(e)} id="countries" className="text-[16px] bg-gray-50 border border-gray-200 focus:border-gray-200 text-gray-900 text-sm rounded-[50px] block w-full py-3 px-4 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white">
                            <option value="0">All products</option>
                            {featuredCategories?.map((category, index) => (
                                <option key={index} value={category.id}>{category.name}</option>
                            ))}

                        </select>
                    </div>
                </div>

                <div className='flex flex-wrap flex-col md:flex-row gap-4 md:gap-6 mt-5 md:mt-10'>
                    {rowData?.length > 0 && rowData?.slice(0, 4).map((product, index) => (
                        <Product key={index} type="border" product={product} />
                    ))}
                </div>
            </div>
        </div>
    )
}