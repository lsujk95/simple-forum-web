import axios from "axios";
import camelcaseKeys from "camelcase-keys";

export default {
    async register(email, password, name) {
        return await axios.post('http://127.0.0.1:8000/api/auth/register', {
            email: email,
            password: password,
            name: name,
        }, {
            headers: {
                'Accept': 'application/json',
                'Accept-Language': 'pl',
                'Device-Name': 'webapp',
            },
            transformResponse: [(data) => {
                return camelcaseKeys(JSON.parse(data), { deep: true })
            }],
        });
    },
    async login(email, password) {
        return await axios.post('http://127.0.0.1:8000/api/auth/get-token', {
            email: email,
            password: password,
        }, {
            headers: {
                'Accept': 'application/json',
                'Accept-Language': 'pl',
                'Device-Name': 'webapp',
            },
            transformResponse: [(data) => {
                return camelcaseKeys(JSON.parse(data), { deep: true })
            }],
        });
    },
};