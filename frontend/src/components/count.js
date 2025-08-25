import { useState } from "react"
export const Count = ({ handleCount, qty }) => {
    return (
        <div className='flex h-14 bg-gray-100 rounded-[8px]'>
            <button onClick={() => handleCount("dec")} type="button" className="cursor-pointer hover:bg-gray-100 justify-center h-14 w-14 transition text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-700 dark:hover:bg-gray-100 font-medium rounded-[8px] text-sm p-3 text-center inline-flex items-center group">
                <svg className="fill-current" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M18 13H6c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1s-.45 1-1 1"></path></svg>
            </button>
            <button type="button" className="text-[20px] font-bold hover:bg-gray-100 justify-center h-14 w-14 transition text-gray-700 dark:text-gray-700 dark:hover:bg-gray-100 rounded-[8px] text-sm p-3 text-center inline-flex items-center group">
                {qty}
            </button>
            <button onClick={() => handleCount("inc")} type="button" className="cursor-pointer hover:bg-gray-100 justify-center h-14 w-14 transition text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-700 dark:hover:bg-gray-100 font-medium rounded-[8px] text-sm p-3 text-center inline-flex items-center group">
                <svg className="fill-current" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1"></path></svg>
            </button>
        </div>
    )
}
