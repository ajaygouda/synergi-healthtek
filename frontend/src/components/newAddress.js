'use client';

import { useState, useEffect } from "react";
import { useAuth } from '@/api/context/auth-context';
import { useToast } from "@/api/context/toast-context";
import { useCustomer } from '@/api/context/customer-context';
const PORT = process.env.NEXT_PUBLIC_API_URL;

const NewAddress = ({ address, open, onClose }) => {
    if (!open) return null;
    const [errors, setErrors] = useState({});
    const { auth, setAuth, logout } = useAuth() ?? {};
    const [editError, setEditError] = useState(false);
    const { toastTrigger } = useToast();
    const { customer, triggerRefresh, handleRemoveItem } = useCustomer();

    const [FormData, setFormData] = useState({
        address: "",
        landmark: "",
        type: "",
        zipcode: "",
        city: "",
        state: "",
        country: "",
        name: "",
        phone: "",
    });

    const validateField = (name, value) => {
        let error = "";

        if (name === "type" && !value.trim()) {
            error = "Required";
        }
        if (name === "name" && !value.trim()) {
            error = "Required";
        }
        if (name === "phone") {
            if (!value) error = "Required";
            else if (!/^\d{10}$/.test(value)) error = "Must be 10 digits";
        }
        if (name === "address" && !value.trim()) {
            error = "Required";
        }
        if (name === "landmark" && !value.trim()) {
            error = "Required";
        }
        if (name === "zipcode" && !value.trim()) {
            error = "Required";
        }
        if (name === "city" && !value.trim()) {
            error = "Required";
        }
        if (name === "state" && !value.trim()) {
            error = "Required";
        }
        if (name === "country" && !value.trim()) {
            error = "Required";
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        const updatedFormData = {
            ...FormData,
            [name]: value
        };

        setFormData(updatedFormData);

        const error = validateField(name, value);
        setErrors((prev) => ({
            ...prev,
            [name]: error,
        }));
        setEditError(isFormDataModified(updatedFormData, address));
    };

    useEffect(() => {
        const newFormData = {
            address: address?.address || "",
            landmark: address?.landmark || "",
            type: address?.type || "",
            zipcode: address?.zipcode || "",
            city: address?.city || "",
            state: address?.state || "",
            country: address?.country || "",
            name: address?.name || "",
            phone: address?.phone || "",
        };

        setFormData(newFormData);
        setEditError(false); // reset on open

        // Validate all fields
        const newErrors = {};
        Object.entries(newFormData).forEach(([key, value]) => {
            const error = validateField(key, value);
            if (error) {
                newErrors[key] = error;
            }
        });
        if (address) {
            setErrors(newErrors);
        }

    }, [address, open]);



    const isFormDataModified = (formData, originalData) => {
        for (const key in formData) {
            if (formData[key] !== (originalData?.[key] || "")) {
                return true;
            }
        }
        return false;
    };



    const handleAdd = async (e) => {
        if (address) {
            e.preventDefault()
            try {
                const res = await fetch(`${PORT}/api/addresses/${address.documentId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        "data": FormData
                    }),
                });

                const result = await res.json();
                onClose();
                toastTrigger("success", "Address updated successfully!");
                triggerRefresh();
            } catch (err) {
                console.log("Error updating customer:", err);
            }
        }
        else {
            let newAddress = { ...FormData, customer: auth.customer.documentId }
            e.preventDefault()
            try {
                const res = await fetch(`${PORT}/api/addresses`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        "data": newAddress
                    }),
                });

                const result = await res.json();
                onClose();
                toastTrigger("success", "Address added successfully!");
                triggerRefresh();
            } catch (err) {
                console.log("Error updating customer:", err);
            }
        }
    };

    const hasErrors = Object.values(errors).some((v) => v !== "");

    return (
        <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black/50">
            <div className="relative p-4 w-full max-w-xl max-h-full">
                <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                    <div className="flex justify-between p-4 items-center">
                        <h5 className="text-[20px] font-bold">{address ? "Edit" : "Add"} Address</h5>
                        <button
                            type="button"
                            onClick={onClose}
                            className="cursor-pointer p-2 top-3 right-3 text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        >✕</button>
                    </div>

                    {/* Modal content */}
                    <div className="p-4 md:p-5">
                        <form onSubmit={handleAdd} className="mx-auto">
                            <div className="mb-4">
                                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Address {errors.address && <span className="text-warning-500">{errors.address}</span>}</label>
                                <textarea onChange={handleChange} value={FormData.address} name="address" type="text" id="address" className={`${errors.address ? "border-warning-500" : "border-gray-200 dark:border-gray-300"} rounded-md bg-gray-50 border text-gray-900 text-sm w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white`} ></textarea>
                            </div>
                            <div className="flex gap-6 w-full mb-4">
                                <div className="w-full">
                                    <label htmlFor="landmark" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Landmark {errors.landmark && <span className="text-warning-500">{errors.landmark}</span>}</label>
                                    <input onChange={handleChange} value={FormData.landmark} name="landmark" type="text" id="landmark" className={`${errors.landmark ? "border-warning-500" : "border-gray-200 dark:border-gray-300"} rounded-md bg-gray-50 border text-gray-900 text-sm w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white`} />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Address Type {errors.type && <span className="text-warning-500">{errors.type}</span>}</label>
                                    <input onChange={handleChange} value={FormData.type} name="type" type="text" id="type" className={`${errors.type ? "border-warning-500" : "border-gray-200 dark:border-gray-300"} rounded-md bg-gray-50 border text-gray-900 text-sm w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white`} />
                                </div>
                            </div>

                            <div className="flex gap-6 w-full mb-4">
                                <div className="w-full">
                                    <label htmlFor="zipcode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Postal Code {errors.zipcode && <span className="text-warning-500">{errors.zipcode}</span>}</label>
                                    <input onChange={handleChange} value={FormData.zipcode} name="zipcode" type="text" id="zipcode" className={`${errors.zipcode ? "border-warning-500" : "border-gray-200 dark:border-gray-300"} rounded-md bg-gray-50 border text-gray-900 text-sm w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white`} />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">City {errors.city && <span className="text-warning-500">{errors.city}</span>}</label>
                                    <input onChange={handleChange} value={FormData.city} name="city" type="text" id="city" className={`${errors.city ? "border-warning-500" : "border-gray-200 dark:border-gray-300"} rounded-md bg-gray-50 border text-gray-900 text-sm w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white`} />
                                </div>
                            </div>
                            <div className="flex gap-6 w-full mb-4">
                                <div className="w-full">
                                    <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">State {errors.state && <span className="text-warning-500">{errors.name}</span>}</label>
                                    <input onChange={handleChange} value={FormData.state} name="state" type="text" id="state" className={`${errors.state ? "border-warning-500" : "border-gray-200 dark:border-gray-300"} rounded-md bg-gray-50 border text-gray-900 text-sm w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white`} />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Country {errors.country && <span className="text-warning-500">{errors.country}</span>}</label>
                                    <input onChange={handleChange} value={FormData.country} name="country" type="text" id="country" className={`${errors.country ? "border-warning-500" : "border-gray-200 dark:border-gray-300"} rounded-md bg-gray-50 border text-gray-900 text-sm w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white`} />
                                </div>
                            </div>
                            <div className="flex gap-6 w-full mb-4">
                                <div className="w-full">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name {errors.name && <span className="text-warning-500">{errors.name}</span>}</label>
                                    <input onChange={handleChange} value={FormData.name} name="name" type="text" id="name" className={`${errors.name ? "border-warning-500" : "border-gray-200 dark:border-gray-300"} rounded-md bg-gray-50 border text-gray-900 text-sm w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white`} />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone {errors.phone && <span className="text-warning-500">{errors.phone}</span>}</label>
                                    <input onChange={handleChange} value={FormData.phone} name="phone" type="tel" id="phone" className={`${errors.phone ? "border-warning-500" : "border-gray-200 dark:border-gray-300"} rounded-md bg-gray-50 border text-gray-900 text-sm w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white`} />
                                </div>
                                {/* <div className="w-full">
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email {errors.email && <span className="text-warning-500">{errors.email}</span>}</label>
                                    <input onChange={handleChange} value={FormData.email} name="email" type="email" id="email" className={`${errors.email ? "border-warning-500" : "border-gray-200 dark:border-gray-300"} rounded-md bg-gray-50 border text-gray-900 text-sm w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white`} />
                                </div> */}
                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    type="button"
                                    className="py-2.5 px-5 cursor-pointer text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAdd}
                                    disabled={hasErrors || !editError}
                                    type="submit"
                                    className={`font-medium rounded-[8px] text-base px-5 py-2.5 text-center transition ${hasErrors || !editError ? "cursor-not-allowed bg-gray-100 text-gray-500" : "cursor-pointer text-white bg-primary hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700"}`}>
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewAddress;
