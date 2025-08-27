"use client"

import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from 'next/navigation'


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState <any> (null);
    const router = useRouter();

    useEffect(() => {
        let storedUser = localStorage.getItem("auth");
        setAuth(JSON.parse(storedUser))
    }, [])

    useEffect(() => {
        if (auth) {
            localStorage.setItem('auth', JSON.stringify(auth));
        }
    }, [auth]);

    const logout = () => {
        setAuth(null);
        localStorage.removeItem('auth');
        router.push("/")
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth, logout }}>
            {children}
        </AuthContext.Provider >

    )
}
export const useAuth = () => useContext(AuthContext);