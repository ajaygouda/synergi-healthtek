"use client"

import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from 'next/navigation'


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                setAuth(JSON.parse(storedUser) || {});
            } catch (err) {
                console.error("Invalid user JSON", err);
                setAuth({});
            }
        }
    }, []);

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
        </AuthContext.Provider>

    )
}
export const useAuth = () => useContext(AuthContext);