"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/api/context/auth-context';
import { useCustomer } from '@/api/context/customer-context';
import AuthService from '@/api/auth.service';
const PORT = process.env.NEXT_PUBLIC_API_URL;

const Login = () => {
    const [serverError, setServerError] = useState('');
    const router = useRouter();
    const { auth, setAuth, logout } = useAuth();
    const { cartitems, triggerRefresh, handleRemoveItem } = useCustomer();
    const [formData, setFormData] = useState({
        identifier: "",
        password: "",
    })
    const [errors, setErrors] = useState({})

    useEffect(() => {
        const storedAuth = localStorage.getItem('auth');
        if (storedAuth && storedAuth !== "{}") {
            router.back()
        }
    }, []);

    const validateField = (name, value) => {
        let error = "";

        if (name === "identifier") {
            if (!value) error = "Required";
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email format";
        }

        if (name === "password") {
            if (!value) error = "Required";
            else if (value.length < 6) error = "Must be at least 6 characters";
        }

        return error;
    };

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

    const handleLogin = async (e) => {
        e.preventDefault();
        setServerError("")
        try {
            debugger
            let postData = { ...formData };
            delete postData.conformPassword;
            const result = await AuthService.login(postData)

            const customerRes = await fetch(`${PORT}/api/customers?filters[user][id][$eq]=${result.user.id}`, {
                headers: {
                    Authorization: `Bearer ${result.jwt}`
                }
            });

            const customerData = await customerRes.json();

            if (!result.jwt) {
                setServerError(result.error.message || "Login failed");
                return;
            }
            const authData = { ...result, customer: customerData.data[0] };

            localStorage.setItem("auth", JSON.stringify(authData));
            setAuth(authData);
            triggerRefresh();

            if (cartitems?.length > 0) {
                router.push("/cart")
            }
            else {
                router.push("/products")
            }
        }
        catch (err) {
            setServerError("Something went wrong");
        }
    }


    const hasErrors = Object.keys(errors).length === 0 || Object.keys(errors).length !== 2 || Object.values(errors).some((v) => v !== "");

    return (
        <div className="flex my-10">
            <div className="w-[400px] m-auto rounded-[16px]">
                <div className='mb-5'>
                    <h5 className="font-bold text-[24px] flex gap-4">
                        <Link href="">Login</Link>
                        <Link href="/auth/signup" className="text-gray-200 dark:text-gray-400">Signup</Link>
                    </h5>
                </div>
                <form className="mx-auto" onSubmit={handleLogin}>
                    <div className="mb-5 w-full">
                        <label htmlFor="identifier" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email {errors.identifier && <span className="text-warning-500">{errors.identifier}</span>}</label>
                        <input onChange={handleChange} value={FormData.identifier} name="identifier" type="identifier" id="identifier" className={`${errors.identifier ? "border-warning-500" : "border-gray-200 dark:border-gray-300"} rounded-md bg-gray-50 border text-gray-900 text-sm w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white`} />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password {errors.password && <span className="text-warning-500">{errors.password}</span>}</label>
                        <input onChange={handleChange} value={FormData.password} name="password" type="password" id="password" className={`${errors.password ? "border-warning-500" : "border-gray-200 dark:border-gray-300"} rounded-md bg-gray-50 border text-gray-900 text-sm w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white`} />
                    </div>

                    <div className="flex justify-center">
                        <button
                            disabled={hasErrors}
                            type="submit"
                            className={`w-full font-medium rounded-[8px] text-base px-10 py-2.5 text-center transition ${hasErrors ? "cursor-not-allowed bg-gray-100 text-gray-500" : "cursor-pointer text-white bg-primary hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700"}`}>
                            Login
                        </button>
                    </div>

                    {/* <div className="flex">
                        <Link href="/auth/forgotPassword" type="button" className="py-5 cursor-pointer text-gray-500 dark:text-gray-200 dark:hover:text-gray-100 hover:text-primary-500 font-medium text-base text-center">Forgot Password ?</Link>
                    </div> */}

                    <p className='text-base py-2 text-warning-500'>{serverError}</p>

                </form>
            </div>
        </div>
    )
}
export default Login;