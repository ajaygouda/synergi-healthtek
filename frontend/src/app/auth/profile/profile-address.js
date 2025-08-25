"use client"
import { useState } from 'react';
import NewAddress from '@/components/newAddress';
import { useToast } from '@/api/context/toast-context';
import { useCustomer } from '@/api/context/customer-context';

const ProfileAddress = ({ customerData }) => {
    const [open, setOpen] = useState(false);
    const [address, setAddress] = useState();
    const { toastTrigger } = useToast();
    const { customer, triggerRefresh, handleRemoveItem } = useCustomer();

    const handleDelete = async (item) => {
        try {
            const res = await fetch(`http://localhost:1337/api/addresses/${item.documentId}`, {
                method: "DELETE",
            });

            if (res.ok) {
                toastTrigger("success", "Address deleted successfully!");
                triggerRefresh()
            } else {
                console.log("Delete failed with status:", res.status);
            }
        } catch (err) {
            console.error("Error while deleting:", err);
        }
    };


    return (
        <div className="w-[100%]">
            <div className="flex justify-between mb-6">
                <h5 className="text-gray-700 font-bold text-[24px]">Address</h5>
                <button onClick={() => { setOpen(true); setAddress() }} className="py-2 cursor-pointer px-5 transition bg-primary-500 hover:bg-primary-600 rounded-[8px] text-gray-100">Add New</button>
            </div>

            {customerData?.addresses.map((item, index) => (
                <div key={index} className={`${index === 0 ? "pt-0" : ""} ${customerData.addresses.length - 1 === index ? "border-b-0" : ""} py-6 border-b border-gray-200 flex`}>
                    <div className="flex-1">
                        <div className='px-2 py-1 text-[12px] bg-gray-100 inline-block rounded-[8px] mb-2'>{item.type}</div>
                        <h5 className="text-[16px] text-gray-700 font-bold">{item.name}</h5>
                        <p className="text-[14px] mb-2">{item.phone}</p>
                        <div className="text-gray-500 text-[14px]">
                            <p>{`${item.address}, ${item.landmark}, ${item.zipcode}, ${item.city}, ${item.state}, ${item.country}`}</p>
                            <p></p>
                        </div>
                    </div>
                    <div className="w-[20%] justify-end text-right flex flex-col gap-4">
                        <div className="flex gap-4 justify-end">
                            <button onClick={() => { setOpen(true); setAddress(item) }} type="button" className="cursor-pointer hover:bg-gray-100 justify-center h-10 w-10 transition text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-700 dark:hover:bg-gray-100 font-medium rounded-[8px] text-sm p-2.5 text-center inline-flex items-center group"><svg className="fill-current" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1q-.15.15-.15.36M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"></path></svg></button>
                            <button onClick={() => handleDelete(item)} type="button" className="cursor-pointer hover:bg-gray-100 justify-center h-10 w-10 transition text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-700 dark:hover:bg-gray-100 font-medium rounded-[8px] text-sm p-2.5 text-center inline-flex items-center group"><svg className="fill-current" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1"></path></svg></button>
                        </div>
                    </div>
                </div>
            ))
            }
            {
                open &&
                <NewAddress address={address} open={open} onClose={() => setOpen(false)} />
            }

        </div >
    )
}
export default ProfileAddress;