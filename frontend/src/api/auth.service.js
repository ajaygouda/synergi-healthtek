import http from './base.service';
import Endpoints from './endpoints';

const AuthService = {
    register: async (payload) => {
        return await http.post(Endpoints.BASE_URL, Endpoints.Auth.register, payload)
    },

    login: async (payload) => {
        return await http.post(Endpoints.BASE_URL, Endpoints.Auth.login, payload)
    },

    updateUser: async (id, payload) => {
        return await http.put(Endpoints.BASE_URL, Endpoints.Auth.updateUser, id, payload)
    },
}

export default AuthService
