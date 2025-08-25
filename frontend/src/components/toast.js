"use client"
import { useEffect, useState } from "react";

export default function ToastExample({type, message}) {
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        let timer = setTimeout(() => setShowToast(false), 3000);
        return () => clearTimeout(timer)
    }, [showToast])
    let type = "danger"

    return (
        <div className="flex flex-col items-center">
            <div className={`fixed left-1/2 -translate-x-1/2 transition-all duration-500 ease-in-out ${showToast ? "bottom-5 opacity-100" : "bottom-0 opacity-0"} flex justify-center items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800`} role="alert">
                <div className={`${type === "success" ? "text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200" : type === "warning" ? "text-amber-500 bg-amber-100 rounded-lg dark:bg-amber-800 dark:text-amber-200" : "text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200"} inline-flex items-center justify-center shrink-0 w-8 h-8`}>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        {type === "success" && <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />}
                        {type === "danger" && <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>}
                        {type === "warning" && <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>}
                    </svg>
                    <span className="sr-only">Check icon</span>
                </div>
                <div className="ms-3 text-sm font-normal">{message}</div>
                <button type="button" onClick={() => setShowToast(false)} className="cursor-pointer ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">
                    <span className="sr-only">Close</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
