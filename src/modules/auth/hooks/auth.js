import useBackend from './../../../hooks/backend.js';

export default function useAuth() {
    const backendHook = useBackend();

    async function register(email, password, name) {
        return await backendHook.post('/api/auth/register', false, {
            email: email,
            password: password,
            name: name,
        });
    }

    async function getToken(email, password) {
        return await backendHook.post('/api/auth/get-token', false, {
            email: email,
            password: password,
        });
    }

    async function refreshToken(token) {
        return await backendHook.post('/api/auth/refresh-token', false, {
            token: token,
        });
    }

    return {
        register,
        getToken,
        refreshToken,
    };
};