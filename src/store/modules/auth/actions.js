import axios from 'axios'

export default {
    async login(context, payload) {
        const response = await axios.post('http://127.0.0.1:8000/api/auth/get-token', {
            email: payload.email,
            password: payload.password,
        }, {
            headers: {
                'Accept': 'application/json',
                'Accept-Language': 'pl',
                'Device-Name': 'webapp',
            }
        });

        if (response.data.success === true) {
            await context.commit('setAuth', {
                token: response.data.data.token,
                tokenExpiresAt: response.data.data.expires_at,
                user: response.data.data.user,
            });
        }

        return response.data;
    },
    async register(context, payload) {
        const response = await axios.post('http://127.0.0.1:8000/api/auth/register', {
            email: payload.email,
            password: payload.password,
            name: payload.name,
        }, {
            headers: {
                'Accept': 'application/json',
                'Accept-Language': 'pl',
                'Device-Name': 'webapp',
            }
        });

        if (response.data.success === true) {
            await context.commit('setAuth', {
                token: response.data.data.token,
                tokenExpiresAt: response.data.data.expires_at,
                user: response.data.data.user,
            });
        }

        return response.data;
    },
};