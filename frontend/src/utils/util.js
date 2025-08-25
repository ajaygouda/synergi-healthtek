"use client"

export const urlFormat = (value, ...args) => {
    return value.replace(/{([0-9]+)}/g, (match, index) => {
        const replacement = args[index];
        // If replacement is undefined or empty string, keep original placeholder
        if (replacement === undefined || replacement === "") {
            return match;
        }
        return replacement;
    });
};



export const totalCount = (items) => {
    return items?.reduce((total, item) => total + item.price, 0);
};

// If you want to export all as default object:
const Util = {
    urlFormat,
    totalCount,
};

export default Util;
