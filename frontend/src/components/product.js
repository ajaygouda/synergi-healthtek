"use client";
import Link from 'next/link';
const PORT = process.env.STRAPI_API_LOCAL_PORT;
const Product = ({ type, product }) => {

    return (
        <Link href={`/products/${product.slug}_${product.id}`} className={`${type === "border" ? "border-1 dark:border-0" : ""} w-full cursor-pointer md:w-[calc(25%-18px)] bg-white text-gray-200 flex flex-col rounded-[12px] items-center p-4`}>
            <div className='h-[196px] flex items-center'>
                <img width="196px" src={product?.images && product?.images[0]?.url} />
            </div>
            <div className='mt-6'>
                <p className='uppercase text-xs font-bold text-gray-400 tracking-widest'>{product.category.name}</p>
                <h5 className='text-[16px] text-gray-500 dark:text-gray-900 font-bold mt-2'>{product.title}</h5>
            </div>
        </Link>

    )
}
export default Product;