"use client"
import Link from 'next/link';
import { useTheme } from "../api/context/theme-context";
import { useMenu } from '@/api/context/menu-context';
import { useAuth } from '@/api/context/auth-context';
import { useState, useRef, useEffect } from 'react';
import { useCustomer } from "../api/context/customer-context";
const PORT = process.env.NEXT_PUBLIC_API_URL;

const menus = [
    "Home", "Products", "About", "Contact", "Support", "Career"
]

export const Header = ({data}) => {
    const { auth, setAuth, logout } = useAuth() ?? {};
    const { customer } = useCustomer();
    const { theme, toggleTheme } = useTheme();
    const { activeMenu } = useMenu();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
   // const [data, setData] = useState()

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // useEffect(() => {
    //     const fetchHeader = async () => {
    //         try {
    //             const headerRes = await fetch(`${PORT}/api/navigation?populate=*`);
    //             const res = await headerRes.json();
    //             setData(res.data)
    //         }
    //         catch (err) {

    //         }
    //     }
    //     fetchHeader();
    // }, [])

    return (
        <nav className="bg-white border-b border-b-gray-200 dark:border-b-gray-500 dark:bg-gray-900 w-full z-20 top-0 start-0">
            <div className="container-1256 flex flex-wrap items-center justify-between mx-auto p-4 md:py-4 md:px-0">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={data?.logoWeb?.url} style={{ height: '72px', width: 'auto' }} className="h-8 hidden md:block" alt="Flowbite Logo" />
                    <img src={data?.logoMobile?.url} style={{ height: '56px', width: 'auto' }} className="h-8 block md:hidden" alt="Flowbite Logo" />
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-2">
                    <button onClick={toggleTheme} type="button" className="cursor-pointer justify-center h-11 w-11 transition text-gray-700 hover:text-gray-700 hover:bg-gray-100  dark:text-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-100 font-medium rounded-full text-sm p-2 text-center inline-flex items-center group">
                        <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000">
                            {theme === "light" ?
                                <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z" />
                                :
                                <path d="M440-760v-160h80v160h-80Zm266 110-55-55 112-115 56 57-113 113Zm54 210v-80h160v80H760ZM440-40v-160h80v160h-80ZM254-652 140-763l57-56 113 113-56 54Zm508 512L651-255l54-54 114 110-57 59ZM40-440v-80h160v80H40Zm157 300-56-57 112-112 29 27 29 28-114 114Zm283-100q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-80q66 0 113-47t47-113q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0-160Z" />
                            }
                        </svg>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z" /></svg> */}
                    </button>

                    <Link href={"/cart"} type="button" className=" relative cursor-pointer justify-center h-11 w-11 transition text-gray-700 hover:text-gray-700 hover:bg-gray-100  dark:text-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-100 font-medium rounded-full text-sm p-2 text-center inline-flex items-center group">
                        <span className='right-1 leading-2 p-2 font-bold top-2 flex items-center justify-center border-2 border-white text-[10px] absolute text-white px-1 h-4.5 bg-amber-700 rounded-full'>{customer?.cart_items?.length ? customer?.cart_items?.length : 0}</span>
                        <svg className="fill-current" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2m-8 4c0 .55-.45 1-1 1s-1-.45-1-1V8h2zm2-6c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2m4 6c0 .55-.45 1-1 1s-1-.45-1-1V8h2z"></path></svg>
                    </Link>
                    {auth && Object.keys(auth).length > 0 ?

                        <div className='flex relative' ref={dropdownRef}>
                            <button onClick={() => setOpen((prev) => !prev)} type="button" className="flex justify-center items-center w-11 h-11 cursor-pointer text-white bg-primary hover:bg-primary-600 transition font-medium rounded-full text-base text-center dark:bg-primary-600 dark:hover:bg-primary-700">{auth?.user?.username?.charAt(0)}</button>
                            <div id="doubleDropdown" className={`${open ? "" : "hidden"} absolute top-11 right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}>
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                    <li>
                                        <Link href="/auth/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</Link>
                                    </li>
                                    <li>
                                        <Link href="/" onClick={logout} className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Logout</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        :
                        <Link href={data?.cta?.ctaLink || "/"} type="button" className="cursor-pointer text-white bg-primary hover:bg-primary-600 transition font-medium rounded-full text-base px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700">{data?.cta?.ctaText}</Link>
                    }
                    <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="fill-current" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>

                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {data?.menus?.map((item, index) => (
                            <li key={index} className="mr-0">
                                <Link href={`/${item.name.toLowerCase()}`} className={`${activeMenu === item.name.toLowerCase() ? "dark:text-gray-100 text-gray-700" : "dark:text-gray-300 text-gray-400"} block py-2 px-3 transition text-base font-bold  hover:text-gray-900 dark:hover:text-gray-100 uppercase tracking-wider`} aria-current="page">{item.name}</Link>
                            </li>
                        ))}

                    </ul>
                </div>
            </div >
        </nav >

    )
}









