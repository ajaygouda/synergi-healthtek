"use client"

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/api/context/auth-context';
const PORT = process.env.NEXT_PUBLIC_API_URL;

const Signup = () => {
    const [serverError, setServerError] = useState('');
    const router = useRouter();
    const { auth, setAuth, logout } = useAuth() ?? {};
    const [formData, setformData] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        conformPassword: ""
    })
    const [errors, setErrors] = useState({})

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

        if (name === "conformPassword") {
            if (value !== formData.password) error = "Passwords do not match";
        }

        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformData((prev) => (
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

    const handleSignup = async (e) => {
        e.preventDefault();
        setServerError("");
        try {
            let postData = { ...formData };
            delete postData.conformPassword;
            delete postData.phone;

            // 1. Register user
            const res = await fetch(`${PORT}/api/auth/local/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(postData),
            });

            const userData = await res.json();


            if (!res.ok) {
                setServerError(userData.error?.message || "Registration failed");
                return;
            }


            // 2. Create Customer linked to User
            const customerRes = await fetch(`${PORT}/api/customers`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userData.jwt}`,
                },
                body: JSON.stringify({
                    "data": {
                        "name": userData.user.username,
                        "email": userData.user.email,
                        "phone": formData.phone,
                        "user": userData.user.id,
                        "addresses": [],
                        //"orders": []

                    }
                }),
            });


            const result = await customerRes.json();
            if (result) {
                setAuth({ ...userData, customer: result.data });

            }

            if (!customerRes.ok) {
                setServerError(result.error?.message || "Customer creation failed");
                return;
            }
            router.push("/products")
            // if (cartitems && cartitems?.length > 0) {
            //     router.push("/cart")
            // }
            // else {
            //     router.push("/products")
            // }
        } catch (err) {
            setServerError("Something went wrong. Please try again.");
        }
    };

    const hasErrors = Object.keys(errors).length === 0 || Object.keys(errors).length !== 5 || Object.values(errors).some((v) => v !== "");

    return (
        <div className="flex my-10">
            <div className="w-[400px] m-auto rounded-[16px]">
                <div className='mb-5'>
                    <h5 className="font-bold text-[24px] flex gap-4">
                        <Link className="text-gray-200 dark:text-gray-400" href="/auth/login">Login</Link>
                        <Link href="">Signup</Link>
                    </h5>
                </div>
                <form onSubmit={handleSignup} className="mx-auto">
                    <div className="mb-5">
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name {errors.username && <span className="text-warning-500">{errors.username}</span>}</label>
                        <input onChange={handleChange} value={formData.username} name="username" type="text" id="username" className={`${errors.username ? "border-warning-500" : "border-gray-200 dark:border-gray-300"} rounded-md bg-gray-50 border text-gray-900 text-sm w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white`} />
                    </div>
                    <div className="mb-5 w-full">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email {errors.email && <span className="text-warning-500">{errors.email}</span>}</label>
                        <input onChange={handleChange} value={formData.email} name="email" type="email" id="email" className={`${errors.email ? "border-warning-500" : "border-gray-200 dark:border-gray-300"} rounded-md bg-gray-50 border text-gray-900 text-sm w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white`} />
                    </div>
                    <div className="mb-5 w-full">
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone {errors.phone && <span className="text-warning-500">{errors.phone}</span>}</label>
                        <input onChange={handleChange} value={formData.phone} name="phone" type="phone" id="phone" className={`${errors.phone ? "border-warning-500" : "border-gray-200 dark:border-gray-300"} rounded-md bg-gray-50 border text-gray-900 text-sm w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white`} />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password {errors.password && <span className="text-warning-500">{errors.password}</span>}</label>
                        <input onChange={handleChange} value={formData.password} name="password" type="password" id="password" className={`${errors.password ? "border-warning-500" : "border-gray-200 dark:border-gray-300"} rounded-md bg-gray-50 border text-gray-900 text-sm w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white`} />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="conformPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Confirm Password {errors.conformPassword && <span className="text-warning-500">{errors.conformPassword}</span>}</label>
                        <input onChange={handleChange} value={formData.conformPassword} name="conformPassword" type="password" id="conformPassword" className={`${errors.conformPassword ? "border-warning-500" : "border-gray-200 dark:border-gray-300"} rounded-md bg-gray-50 border text-gray-900 text-sm w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white`} />
                    </div>
                    <div className="text-right">
                        <button
                            disabled={hasErrors}
                            type="submit"
                            className={`w-full font-medium rounded-[8px] text-base px-10 py-2.5 text-center transition ${hasErrors ? "cursor-not-allowed bg-gray-100 text-gray-500" : "cursor-pointer text-white bg-primary hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700"}`}>
                            Sign Up
                        </button>

                    </div>
                    <p className='text-base py-2 text-warning-500'>{serverError}</p>
                </form>
            </div>
        </div>
    )
}
export default Signup;