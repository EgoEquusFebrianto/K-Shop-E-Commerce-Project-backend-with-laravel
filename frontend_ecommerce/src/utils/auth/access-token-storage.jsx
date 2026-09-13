let accessToken = null;
let user = null;

export const AccessTokenStorage = {
    /**
     * 
     * @param {string} token 
     */
    save: (token) => {
        accessToken = token;
    },

    get: () => {
        return accessToken;
    },

    clear: () => {
        accessToken = null;
    },

    has: () => {
        return accessToken !== null;
    },
}

export const UserStorage = {
    save: (dataUser) => {
        user = dataUser;
    },

    get: () => {
        return user;
    },
}