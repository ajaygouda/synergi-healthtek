import http from './base.service';
import Endpoints from './endpoints';

const AuthenticatedService = {
    getCustomerById: async (id) => {
        return await http.get(Endpoints.BASE_URL, Endpoints.Authenticated.getCustomerById, id)
    },

    postAddress: async (payload) => {
        return await http.post(Endpoints.BASE_URL, Endpoints.Authenticated.postAddress, payload)
    },

    updateAddress: async (id, payload) => {
        return await http.post(Endpoints.BASE_URL, Endpoints.Authenticated.updateAddress, id, payload)
    },

    deleteAddress: async (id) => {
        return await http.post(Endpoints.BASE_URL, Endpoints.Authenticated.deleteAddress, id)
    },

    postCartitem: async (payload) => {
        return await http.post(Endpoints.BASE_URL, Endpoints.Authenticated.postCartitem, payload)
    },

    getCartItemsByCustomerId: async (id) => {
        return await http.get(Endpoints.BASE_URL, Endpoints.Authenticated.getCartItemsByCustomerId, id)
    },

    updateCartitem: async (id, payload) => {
        return await http.put(Endpoints.BASE_URL, Endpoints.Authenticated.updateCartitem, id, payload)
    },

    deleteCartitem: async (id) => {
        return await http.delete(Endpoints.BASE_URL, Endpoints.Authenticated.deleteCartitem, id)
    },

    postOrder: async (payload) => {
        return await http.post(Endpoints.BASE_URL, Endpoints.Authenticated.postOrder, payload)
    },
}

export default AuthenticatedService
