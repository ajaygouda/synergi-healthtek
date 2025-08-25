"use client"
import { useState } from 'react';
import Link from 'next/link';
const ForgotPassword = () => {
    const [formData, setFormData] = useState({
        email:"",
        password:"",
        confirmPassword:""
    });
    const [serverError, setServerError] = useState('');
    const [errors, setErrors] = useState({})
    const hasErrors = Object.keys(errors).length === 0 || Oject.keys(errors).length !== 2 || Object.values(errors).some((v) => v !== "");

    const verifyEmail = ()=>{

    }

    return (
        <div className="flex my-10">
            <div className="w-[400px] m-auto rounded-[16px]">
                <h5 className="font-bold text-[24px] mb-5 flex gap-4">
                    <a className="flex gap-4" href="/auth/login">Forgot Password</a>
                </h5>
                <form className="mx-auto">
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                        <div className="relative">
                            <input type="text" id="email" className="rounded-md bg-gray-50 border border-gray-300 text-gray-900 text-sm w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white" />
                            <div onClick={verifyEmail} title="Verify Email" className="cursor-pointer text-gray-500 hover:text-primary-500 absolute inset-y-0 right-0 flex items-center px-3">
                                <svg className="fill-current cursor-pointer w-6 h-6" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0s.41-1.08 0-1.49zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"></path></svg>
                            </div>
                        </div>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">New Password</label>
                        <input type="text" id="base-input" className="rounded-md bg-gray-50 border border-gray-300 text-gray-900 text-sm w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white" />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Confirm Password</label>
                        <input type="text" id="base-input" className="rounded-md bg-gray-50 border border-gray-300 text-gray-900 text-sm w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white" />
                    </div>

                    <div className="text-end">
                        <button
                            disabled={hasErrors}
                            type="submit"
                            className={`w-full font-medium rounded-[8px] text-base px-10 py-2.5 text-center transition ${hasErrors ? "cursor-not-allowed bg-gray-100 text-gray-500" : "cursor-pointer text-white bg-primary hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700"}`}>
                            Login
                        </button>
                    </div>
                    <div className="flex">
                        <Link href="/auth/login" type="button" className="py-5 cursor-pointer text-gray-500 dark:text-gray-200 dark:hover:text-gray-100 hover:text-primary-500 font-medium text-base text-center">Ready to Login ?</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default ForgotPassword;