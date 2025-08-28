"use client"

import { createContext, useContext, useState, useEffect } from "react";
const CustomerContext = createContext();
import AuthenticatedService from '@/api/authenticated.service';
import { useToast } from '@/api/context/toast-context';
import { useRouter } from "next/navigation";


export const CustomerProvider = ({ children }) => {
    const route = useRouter();
    const [customer, setCustomer] = useState();
    const [refresh, setRefresh] = useState(0);
    const { toastTrigger } = useToast();


    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const localStorageData = localStorage.getItem("auth");
                if (!localStorageData) return;
                const parsed = JSON.parse(localStorageData);
                const res = await AuthenticatedService.getCustomerById(parsed.customer.documentId);
                setCustomer(res.data);
            }
            catch (err) {
                toastTrigger("danger", "Something went wrong!")
            }
        };
        fetchCustomer();
    }, [refresh]);

    const triggerRefresh = () => setRefresh(count => count + 1);

    const handleAddtocart = async (product) => {
        debugger
        // Get logged in customer id from localStorage or your auth system
        const ls = localStorage.getItem("auth");
        const lsData = JSON.parse(ls);
        if (ls && ls !== "{}") {
            try {
                // 1. Fetch existing cart items for customer
                const res = await AuthenticatedService.getCartItemsByCustomerId(lsData.customer.id)
                const cartItems = res.data;

                // 2. Check if product already in cart
                const existingItem = cartItems?.find(item => item.product.documentId === product.documentId);

                if (existingItem) {
                    // 3a. Update existing cart item quantity and price
                    const cartItemDocumentId = existingItem.documentId;
                    const updatedQuantity = product.qty;
                    const updatedPrice = product.totalPrice;

                    const payload = {
                        data: {
                            quantity: updatedQuantity,
                            price: updatedPrice,
                        }
                    };

                    let updateRes = await AuthenticatedService.updateCartitem(payload, cartItemDocumentId)

                    if (!updateRes) {
                        toastTrigger("danger", "Failed to update cart item")
                    } else {
                        toastTrigger("success", "Cart item updated successfully!");
                        triggerRefresh();
                    }
                } else {
                    // 3b. Create new cart item
                    const payload = {
                        data: {
                            customer: lsData.customer.documentId,
                            product: product.documentId,
                            quantity: product.qty,
                            price: product.totalPrice,
                        }
                    };
                    let createRes = await AuthenticatedService.postCartitem(payload);

                    if (!createRes) {
                        toastTrigger("danger", "Failed to update cart item");
                    } else {
                        toastTrigger("success", "Cart item added successfully!");
                        triggerRefresh();
                    }
                }
            } catch (error) {
                toastTrigger("danger", "Something went wrong!")
            }
        }
        else {
            route.push('/auth/login')
        }
    };

    const handleRemoveItem = async (docId) => {
        try {
            let deleteRes = await AuthenticatedService.deleteCartitem(docId);
            if (deleteRes === "") {
                toastTrigger("success", "Cart item deleted successfully");
                triggerRefresh();
            } else {
                toastTrigger("danger", "Cart item failed to delete")
            }
        } catch (err) {
            toastTrigger("danger", "Something went wrong!")
        }
    };

    return (
        <CustomerContext.Provider value={{ customer, triggerRefresh, handleAddtocart, handleRemoveItem }}>
            {children}
        </CustomerContext.Provider>
    );
};

export const useCustomer = () => {
    const context = useContext(CustomerContext);
    if (!context) throw new Error("useCustomer must be used within CustomerProvider");
    return context;
};
