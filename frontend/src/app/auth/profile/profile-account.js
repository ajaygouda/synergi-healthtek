"use client";
import { useEffect, useState } from "react";

const ProfileAccount = ({ customerData }) => {
    console.log("customerData", customerData)
    const [FormData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
    })
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');

    useEffect(() => {
        setFormData({
            username: customerData.name,
            email: customerData.email,
            phone: customerData.phone,
            password: "",
        })
    }, [customerData])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => (
            {
                ...prev,
                [name]: value
            }
        ));

        const error = validateField(name, value);
        setErrors((prev) => ({
            ...prev,
            [name]: error,
        }));
    }

    const validateField = (name, value) => {
        let error = "";

        if (name === "username" && !value.trim()) {
            error = "Required";
        }

        if (name === "email") {
            if (!value) error = "Required";
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email format";
        }

        if (name === "phone") {
            if (!value) error = "Required";
            else if (!/^\d{10}$/.test(value)) error = "Must be 10 digits";
        }

        if (name === "password") {
            if (!value) error = "Required";
            else if (value.length < 6) error = "Must be at least 6 characters";
        }

        // if (name === "conformPassword") {
        //     if (value !== formData.password) error = "Passwords do not match";
        // }

        return error;
    };

    const handeleSaveChanges = async ()=>{

    }

    const handleSignup = async (e) => { }

    const hasErrors = Object.keys(errors).length === 0 || Object.keys(errors).length !== 4 || Object.values(errors).some((v) => v !== "");

    return (

        <div>
            <div className="flex justify-between mb-6"><h5 className="text-gray-700 font-bold text-[24px]">Account</h5></div>
            <form onSubmit={handleSignup} className="w-[400px]">
                <div className="mb-5">
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name {errors.username && <span className="text-warning-500">{errors.username}</span>}</label>
                    <input onChange={handleChange} value={FormData.username} name="username" type="text" id="username" className={`${errors.username ? "border-warning-500" : "border-gray-200 dark:border-gray-300"} rounded-md bg-gray-50 border text-gray-900 text-sm w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white`} />
                </div>
                <div className="mb-5 w-full">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email {errors.email && <span className="text-warning-500">{errors.email}</span>}</label>
                    <input disabled onChange={handleChange} value={FormData.email} name="email" type="email" id="email" className={`text-gray-300 ${errors.email ? "border-warning-500" : "border-gray-200 dark:border-gray-300"} rounded-md bg-gray-50 border text-sm w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white`} />
                </div>
                <div className="mb-5 w-full">
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone {errors.phone && <span className="text-warning-500">{errors.phone}</span>}</label>
                    <input onChange={handleChange} value={FormData.phone || ""} name="phone" type="tel" id="phone" className={`${errors.phone ? "border-warning-500" : "border-gray-200 dark:border-gray-300"} rounded-md bg-gray-50 border text-gray-900 text-sm w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white`} />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password {errors.password && <span className="text-warning-500">{errors.password}</span>}</label>
                    <input onChange={handleChange} value={FormData.password} name="password" type="password" id="password" className={`${errors.password ? "border-warning-500" : "border-gray-200 dark:border-gray-300"} rounded-md bg-gray-50 border text-gray-900 text-sm w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white`} />
                </div>
                <div className="text-right">
                    <button
                        onClick={handeleSaveChanges}
                        disabled={hasErrors}
                        type="submit"
                        className={`font-medium rounded-[8px] text-base px-5 py-2.5 text-center transition ${hasErrors ? "cursor-not-allowed bg-gray-100 text-gray-500" : "cursor-pointer text-white bg-primary hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700"}`}>
                        Save Changes
                    </button>

                </div>
                {serverError && <p className='text-base py-2 text-warning-500'>{serverError}</p>}
            </form>
        </div>
    )
}
export default ProfileAccount;