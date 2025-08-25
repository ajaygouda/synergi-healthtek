import http from './base.service';
import Endpoints from './endpoints';

const AuthService = {
    register: async (payload) => {
        return await http.post(Endpoints.BASE_URL, Endpoints.Auth.register, payload)
    },

    login: async (payload) => {
        return await http.post(Endpoints.BASE_URL, Endpoints.Auth.login, payload)
    },
}

export default AuthService
