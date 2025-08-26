"use client"
import { useCustomer } from '@/api/context/customer-context';
import { useToast } from '@/api/context/toast-context';
import Link from 'next/link';
import { totalCount } from "@/utils/util";
import { useAuth } from '@/api/context/auth-context';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthenticatedService from '@/api/authenticated.service';
import NewAddress from '@/components/newAddress';

const steps = [{ step: 1, name: "Cart" }, { step: 2, name: "Address" }, { step: 3, name: "Payment" }]
const paymentOptions = [{ id: 0, name: "Cash on Delivery", label: "cod" }, { id: 1, name: "Online Payment", label: "Online" }]

const Cart = () => {
    const router = useRouter();
    const { auth, setAuth, logout } = useAuth();
    const { customer, triggerRefresh, handleRemoveItem } = useCustomer();
    const { toastTrigger } = useToast();
    const [activeStep, setActiveStep] = useState(steps[0]);
    const subTotal = totalCount(customer?.cart_items);
    const total = totalCount(customer?.cart_items);
    const [selectedAddress, setSelectedAddress] = useState();
    const [selectedPayment, setSelectedPayment] = useState(0);
    const [open, setOpen] = useState(false);
    const [address, setAddress] = useState();
    const [form, setForm] = useState({
        products: "",
        customer: "",
        totalAmount: "",
        orderStatus: "",
        paymentStatus: "",
        shippingAddress: "",
        paymentMethod: ""
    })

    useEffect(() => {
        triggerRefresh();
        setSelectedAddress(customer?.addresses?.[0]?.documentId || null)
    }, []);

    useEffect(() => {
        setForm({
            products: customer?.cart_items.map(({ product, quantity }) => ({
                product: product.documentId,
                quantity: quantity
            })),
            customer: customer?.documentId,
            totalAmount: total,
            orderStatus: "pending",
            paymentStatus: "paid",
            shippingAddress: selectedAddress,
            paymentMethod: selectedPayment === 0 ? "cod" : 'online'
        })
    }, [customer, selectedAddress, selectedPayment])

    const handleCheckout = async () => {
        try {
            let payload = {
                data: form
            }
            const createRes = await AuthenticatedService.postOrder(payload)
            if (!createRes) {
                toastTrigger("danger", "Failed to add new order!")
            } else {
                toastTrigger("success", "Order has been placed!");
                router.push("/order-successful");

                form.products.map((item) => handleRemoveItem(item.product))

            }
        }
        catch (err) {
            toastTrigger("danger", "Something went wrong")
        }
    }


    return (
        <div className="container-1256 my-10">
            <div className="flex flex-row md-flex-col gap-10 my-5 dark:text-gray-200">
                <div className={`${customer?.cart_items?.length > 0 ? " w-[65%]" : "w-full"} flex flex-col gap-6`}>
                    <div>
                        <div className={`${customer?.cart_items.length === 0 ? "rounded-b-none" : ""} border border-gray-100 dark:border-gray-500 md:border-gray-200 rounded-[16px] flex-col md:flex-row flex-wrap w-full`}>
                            <div className={`flex justify-between px-4 py-2 items-center ${customer?.cart_items.length === 0 || activeStep.step !== 1 ? "" : "border-b border-gray-200"}`}>
                                <div className='flex gap-2'>
                                    {/* <div className={`${activeStep.step === 1 ? "bg-primary-500 text-white" : "bg-gray-100 text-primary-500"} h-6 w-6  rounded-[4px] flex justify-center items-center`}>1</div> */}
                                    <h5 className='uppercase font-bold text-gray-400 tracking-wide'>Cart</h5>
                                </div>
                                <div className='flex gap-2'>
                                    {activeStep.step !== 1 && <button className='cursor-pointer py-1.5 px-4 text-gray-500 hover:text-gray-700 transition'>Change</button>}
                                    <Link href="/products" className='cursor-pointer text-center transition py-1.5 px-4 hover:border-primary-500 hover:bg-primary-500 hover:text-gray-100 rounded-[8px] text-primary-500'>Add Product</Link>
                                </div>
                            </div>

                            <div className='w-full flex flex-col'>
                                {customer?.cart_items?.map((item, index) => (
                                    <Link href={`/products/${item.product.slug}_${item.product.id}`} key={index} className={`flex gap-6 p-4 flex-col md:flex-row flex-wrap w-full ${customer.cart_items.length - 1 === index || customer.cart_items.length === 0 ? "" : "border-b border-b-gray-200 "}`}>
                                        <div className='w-24 h-24'>
                                            <img className='rounded-[8px]' src={`${item.product?.images && item.product?.images[0].url}`} />
                                        </div>
                                        <div className='flex flex-1 justify-between items-center'>
                                            <div className='w-[50%]'>
                                                <h5 className='font-goodTime text-gray-700 dark:text-gray-100'>{item.product.title}</h5>
                                                <p className='text-[14px] text-gray-500 dark:text-gray-300'>SKU: {item.product.sku}</p>
                                            </div>
                                            <div className='text-base flex gap-6 font-bold text-gray-700 dark:text-gray-100'>
                                                <p className='flex gap-10 items-center'><span>QTY: {item.quantity}</span><span>${item.price}</span></p>
                                                <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleRemoveItem([item.documentId]) }} type="button" className="cursor-pointer justify-center h-10 w-10 transition text-gray-700 hover:text-gray-700 hover:bg-gray-100  dark:text-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-100 font-medium rounded-full text-sm p-2 text-center inline-flex items-center group">
                                                    <svg className="fill-current" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7a.996.996 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41s1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0s.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4"></path></svg>
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {customer?.cart_items?.length === 0 &&
                            <div className='h-[176px] flex items-center justify-center border-gray-200 rounded-t-none rounded-[16px] border border-t-0 text-gray-400'>
                                <div className='text-center flex gap-3 flex-col items-center'>
                                    <img className='w-[72px]' src='../empty_cart.png' />
                                    <Link className='text-primary-500' href="/products">Add Products</Link>
                                </div>
                            </div>
                        }
                    </div>


                    {customer?.cart_items?.length > 0 &&

                        <div>
                            <div className={`${customer?.addresses.length === 0 ? "rounded-b-none" : ""} border border-gray-100 dark:border-gray-500 md:border-gray-200 rounded-[16px] flex-col md:flex-row flex-wrap w-full`}>
                                <div className={`flex justify-between px-4 py-2 items-center ${customer?.addresses.length === 0 ? "" : "border-b border-gray-200"}`}>
                                    <div className='flex gap-2'>
                                        {/* <div className={`${activeStep.step === 2 ? "bg-primary-500 text-white" : "bg-gray-100 text-primary-500"} h-6 w-6  rounded-[4px] flex justify-center items-center`}>2</div> */}
                                        <h5 className='uppercase font-bold text-gray-400 tracking-wide'>Delevery Address</h5>
                                    </div>
                                    <div className='flex gap-2'>
                                        <button onClick={() => { setOpen(true); setAddress() }} className='cursor-pointer text-center transition py-1.5 px-4 hover:border-primary-500 hover:bg-primary-500 hover:text-gray-100 rounded-[8px] text-primary-500'>Add Address</button>
                                    </div>
                                </div>

                                <div className='w-full flex flex-col'>
                                    {customer?.addresses.map((item, index) => (
                                        <label
                                            key={index}
                                            onClick={() => setSelectedAddress(item.documentId)}
                                            className={`${customer?.addresses.length - 1 === index ? "" : "border-b border-gray-200"} cursor-pointer p-4 flex items-start gap-3`}
                                        >


                                            <div className="flex-1">
                                                <div className='flex items-center justify-between gap-2 mb-2'>
                                                    <div className='px-2 py-1 text-[12px] bg-gray-100 inline-block rounded-[8px] '>
                                                        {item.type}
                                                    </div>
                                                    <input
                                                        type="radio"
                                                        name="selectedAddress"
                                                        value={item.id}
                                                        checked={selectedAddress === item.documentId}
                                                        onChange={() => setSelectedAddress(item.documentId)}
                                                        className="h-5 w-5"
                                                    />
                                                </div>
                                                <h5 className="text-[16px] text-gray-700 font-bold mb-2">
                                                    {item.name} | {item.phone}
                                                </h5>
                                                <div className="text-gray-500 text-[14px]">
                                                    <p>
                                                        {item.address}, {item.landmark}, {item.zipcode}, {item.city}, {item.state}, {item.country}
                                                    </p>
                                                </div>
                                            </div>
                                        </label>
                                    ))}
                                </div>


                            </div>

                            {customer?.addresses?.length === 0 &&
                                <div className='h-[176px] flex items-center justify-center border-gray-200 rounded-t-none rounded-[16px] border border-t-0 text-gray-400'>
                                    <div className='text-center flex gap-3 flex-col items-center'>
                                        <img className='w-[72px]' src='../cart.png' />
                                        <Link className='text-primary-500' href="/products">Add Address</Link>
                                    </div>
                                </div>
                            }
                        </div>
                    }
                    {customer?.cart_items?.length > 0 &&

                        <div>
                            <div className={`${customer?.addresses.length === 0 ? "rounded-b-none" : ""} border border-gray-100 dark:border-gray-500 md:border-gray-200 rounded-[16px] flex-col md:flex-row flex-wrap w-full`}>
                                <div className={`flex justify-between px-4 py-2 items-center ${customer?.addresses.length === 0 ? "" : "border-b border-gray-200"}`}>
                                    <div className='flex items-center gap-2 h-[36px]'>
                                        {/* <div className={`${activeStep.step === 3 ? "bg-primary-500 text-white" : "bg-gray-100 text-primary-500"} h-6 w-6  rounded-[4px] flex justify-center items-center`}>3</div> */}
                                        <h5 className='uppercase font-bold text-gray-400 tracking-wide'>Payment</h5>
                                    </div>
                                </div>

                                <div className='w-full flex flex-col'>
                                    <ul className="w-full py-2">
                                        {paymentOptions.map((payment, index) => (
                                            <li key={index} className={`w-full ${paymentOptions.length - 1 !== index ? "border-b border-gray-200" : ""}`}>
                                                <div className="flex items-center ps-4">
                                                    <input
                                                        id={payment.id}
                                                        type="radio"
                                                        value={payment.id}
                                                        name="payment"
                                                        checked={selectedPayment === payment.id}
                                                        onChange={() => setSelectedPayment(payment.id)}
                                                        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300"
                                                    />
                                                    <label
                                                        htmlFor={payment.id}
                                                        className="w-full py-3 ms-2 text-md font-medium text-gray-900"
                                                    >
                                                        {payment.name}
                                                    </label>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                    }




                </div>
                {customer?.cart_items?.length > 0 &&
                    <div className="flex-1 h-[100%] bg-gray-100 dark:bg-gray-700 p-6 rounded-[16px]">
                        <div className='flex flex-col gap-2'>
                            <p className='flex justify-between text-gray-500'><span>Sub Total</span> <span>${subTotal}</span></p>
                            <p className='flex justify-between font-bold'><span>Total</span> <span>${total}</span></p>
                        </div>
                        <button onClick={handleCheckout} className='cursor-pointer text-white rounded-[8px] mt-6 p-3 w-full bg-primary-500'>
                            Payment
                        </button>
                    </div>}
                {
                    open &&
                    <NewAddress address={address} open={open} onClose={() => setOpen(false)} />
                }
            </div>
        </div>
    )
}
export default Cart;