import http from './base.service';
import Endpoints from './endpoints';

const CommonService = {

    getHomePage: async () => {
        return await http.get(Endpoints.BASE_URL, Endpoints.Common.getHomePage)
    },

    getProductPage: async () => {
        return await http.get(Endpoints.BASE_URL, Endpoints.Common.getProductPage)
    },

    getCareerPage: async () => {
        return await http.get(Endpoints.BASE_URL, Endpoints.Common.getCareerPage)
    },

    getContactPage: async () => {
        return await http.get(Endpoints.BASE_URL, Endpoints.Common.getContactPage)
    },

    getHeader: async () => {
        return await http.get(Endpoints.BASE_URL, Endpoints.Common.getHeader)
    },

    getFooter: async () => {
        return await http.get(Endpoints.BASE_URL, Endpoints.Common.getFooter)
    },

    getProducts: async () => {
        return await http.get(Endpoints.BASE_URL, Endpoints.Common.getProducts)
    }

}

export default CommonService