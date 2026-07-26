export const decodeToken = (token) => {
    if (!token) return null;

    try {
        return JSON.parse(
            atob(token.split(".")[1])
        );
    } catch {
        return null;
    }
};

export const isTokenExpired = (token) => {
    const payload = decodeToken(token);

    if (!payload) return null;
    return payload.exp * 1000 < Date.now();
};