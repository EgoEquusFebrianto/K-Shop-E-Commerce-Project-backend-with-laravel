import API from '../../api/API'
import { AccessTokenStorage } from '../../../utils/auth/access-token-storage';

const AuthService = {
    login: async (email, password) => {
        const response = await API.post("/auth/login", {
            email,
            password
        });

        // simpan data ke localStorage
        const {access_token} = response.data;

        AccessTokenStorage.save(access_token);

        return response.data
    },

    register: async (request) => {
        const response = await API.post("/auth/register", request);

        // simpan data ke localStorage
        const {access_token} = response.data;
        AccessTokenStorage.save(access_token);

        return response.data
    },

    getMe: async () => {
        const response = await API.get("/auth/me");

        return response.data;
    },
    
    logout: async () => {
        try {
            await API.post("/auth/logout");
        } finally {
            AccessTokenStorage.clear();
        }
    },
};

export default AuthService