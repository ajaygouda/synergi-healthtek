import axios from 'axios';
import { urlFormat } from "@/utils/util";

const http = {
    get: async (baseURL, url, ...args) => {
        try {
            const response = await axios.get(`${baseURL}${urlFormat(url, ...args)}`);
            return handleSuccess(response)
        }
        catch (err) {
            return handleError(err)
        }
    },

    post: async (baseUrl, url, data, ...args) => {
        try {
            const response = await axios.post(`${baseUrl}${urlFormat(url, ...args)}`, data);
            return handleSuccess(response);
        } catch (error) {
            return handleError(error);
        }
    },

    put: async (baseUrl, url, data, ...args) => {
        try {
            const response = await axios.put(`${baseUrl}${urlFormat(url, ...args)}`, data);
            return handleSuccess(response);
        } catch (error) {
            return handleError(error);
        }
    },

    delete: async (baseUrl, url, ...args) => {
        try {
            const response = await axios.delete(`${baseUrl}${urlFormat(url, ...args)}`);
            return handleSuccess(response);
        } catch (error) {
            return handleError(error);
        }
    }
}


const handleSuccess = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response.data;
    }
    throw new Error("Unexpected response status");
}

const handleError = (error) => {
    if (!error.response) {
        return {
            httpStatusCode: 503,
            message: "Network error - please check your connection",
        };
    }
    return {
        httpStatusCode: error.response.status || 500,
        message: error.response.data?.message || "Something went wrong",
    };
}

export default http;
