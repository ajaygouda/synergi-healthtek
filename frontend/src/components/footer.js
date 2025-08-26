"use client"
import Link from 'next/link'
import { useMenu } from '../api/context/menu-context';
const PORT = process.env.NEXT_PUBLIC_API_URL;

const socials = [
    { name: "fb", d: "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m13 2h-2.5A3.5 3.5 0 0 0 12 8.5V11h-2v3h2v7h3v-7h3v-3h-3V9a1 1 0 0 1 1-1h2V5z" },
    { name: "x", d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
    { name: "in", d: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" },
    { name: "insta", d: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" },
    { name: "youtube", d: "M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" }
]
export const Footer = ({ data }) => {
    const { activeMenu } = useMenu();
    return (
        <div className="border-t-1 border-t-gray-200 dark:border-t-gray-500">
            <div className='container-1256'>
                <div className="pt-10 md:pt-20 px-4 md:px-0 flex flex-col gap-6">
                    <img style={{ height: '120px', width: '120px' }} src={`${PORT}/${data.logo.url}`} />
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full flex gap-4">
                            {socials.map((social, index) => (
                                <Link className="h-7 w-7 rounded-4xl flex items-center justify-center text-gray-500 transition hover:text-gray-900 dark:text-gray-200" href="" key={index}>
                                    <svg className="fill-current" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d={social.d}></path></svg>
                                </Link>
                            ))}
                        </div>
                        <div className="w-full flex flex-col gap-4">
                            <div className="flex mb-4 flex-col md:flex-row justify-between">
                                {data.menus.map((item, index) => (
                                    <Link key={index} href={`/${item.name.toLowerCase()}`} className={`${activeMenu === item.name.toLowerCase() ? "dark:text-gray-100 text-gray-700" : "dark:text-gray-300 text-gray-400"} block py-2 transition text-base font-bold  hover:text-gray-900 dark:hover:text-gray-100 uppercase tracking-wider`} aria-current="page">{item.name}</Link>
                                ))}
                            </div>
                            <div className="md:w-[70%] w-[100%] md:text-right ml-auto flex flex-col gap-3 text-gray-500 dark:text-gray-200">
                                <p>{`${data.address.address}, Pincode-${data.address.postalCode}, ${data.address.city}, ${data.address.state}, ${data.address.country}`}</p>
                                <p className="flex md:justify-end gap-2"><svg className="h-7 w-7 fill-current" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99" /></svg>
                                    {data.address?.phones?.map((ph, index) => (
                                        <span key={index}>{ph.number}{index === data.address?.phones?.length - 1 ? "" : ","}</span>
                                    ))}
                                </p>
                                <p className="flex md:justify-end gap-2">
                                    <svg className="h-7 w-7 fill-current" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4-8 5-8-5V6l8 5 8-5z" /></svg>
                                    {data.address?.emails?.map((mail, index) => (
                                        <span key={index}>{mail.emailId}{index === data.address?.emails?.length - 1 ? "" : ","}</span>
                                    ))}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="py-6 border-t-1 border-t-gray-200 dark:border-t-gray-500 text-gray-500 dark:text-gray-200">
                        {data.copyright}
                    </div>
                </div>
            </div>
        </div>
    )
}