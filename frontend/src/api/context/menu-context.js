"use client"

const { createContext, useContext, useState, useEffect } = require("react");
import { usePathname } from 'next/navigation';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const path = usePathname();
    const pathName = path.replace("/", "")
    const [activeMenu, setActiveMenu] = useState(pathName || "home");
    
    useEffect(() => {
        setActiveMenu(pathName ? pathName : "home")
    }, [pathName])

    return (
        <MenuContext.Provider value={{ activeMenu }}>
            {children}
        </MenuContext.Provider>
    )
}
export const useMenu = () => {
    const context = useContext(MenuContext);
    if (!context) throw new Error("useTheme must be used within ThemeProvider");
    return context;
}