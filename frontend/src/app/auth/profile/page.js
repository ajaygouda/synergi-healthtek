"use client"
import { useState, useEffect } from "react";
import ProfileAccount from "./profile-account";
import ProfileAddress from "./profile-address";
import { useRouter } from 'next/navigation';
import ProfileOrders from "./profile-orders";
import { useCustomer } from '@/api/context/customer-context';

const profilemenus = [{ id: 0, name: "Account" }, { id: 1, name: "Addreses" }, { id: 2, name: "Orders" }];

const Profile = () => {
    const router = useRouter();
    const [active, setActive] = useState(profilemenus[0]);
    const { customer, triggerRefresh, handleRemoveItem } = useCustomer();

    const HandleFilter = (obj) => {
        setActive(obj)
    }

    useEffect(() => {
        const storedAuth = localStorage.getItem('auth');
        if (!storedAuth) {
            router.back()
        }
    }, []);


    return (
        <div className="container-1256">
            <div className="flex gap-10">
                <div className="w-[250px] border-r border-gray-200 dark:border-gray-500 py-6">
                    <ul className="flex md:flex-col flex-wrap -mb-px text-sm font-medium text-left" data-tabs-toggle="#default-tab-content" role="tablist">
                        {profilemenus.map((menu, index) => (
                            <li key={index} role="presentation" className={`${active.id === menu.id ? "border-r-[4px] border-primary-500 block" : "block"}`}>
                                <button onClick={() => HandleFilter(menu)} className={`cursor-pointer text-left w-[100%] text-[16px] py-3 rounded-t-lg ${active.id === menu.id ? "text-primary-500 font-bold" : "text-gray-500 dark:text-gray-200"}`} id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">{menu.name}</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="py-6 w-full">
                    {active.id === 0 && customer &&
                        <ProfileAccount customerData={customer} />
                    }
                    {active.id === 1 && customer &&
                        <ProfileAddress customerData={customer} />
                    }
                    {active.id === 2 && customer &&
                        <ProfileOrders customerData={customer} />
                    }
                </div>
            </div>
        </div>
    )
}
export default Profile