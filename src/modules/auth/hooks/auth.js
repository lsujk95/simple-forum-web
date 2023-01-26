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

    async function login(email, password) {
        return await backendHook.post('/api/auth/login', false, {
            email: email,
            password: password,
        });
    }

    return {
        register,
        login,
    };
};