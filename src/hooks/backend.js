import axios from "axios";
import camelcaseKeys from "camelcase-keys";
import { useStore } from "vuex";
import config from "./../config.js";

export default function useBackend() {
    const storeHook = useStore();

    async function call(url, method = 'post', data = null, auth = false) {
        const host = config.host;
        const language = config.language;

        const transformResponse = [(data) => {
            return camelcaseKeys(JSON.parse(data), { deep: true })
        }];

        let headers = {
            common: {
                'Accept': 'application/json',
                'Accept-Language': language,
                'Device-Name': 'webapp',
            },
            'Authorization': null,
        };

        if (auth === true) {
            headers['Authorization'] = 'Bearer ' + storeHook.getters.getToken;
        }

        let response;
        if (method === 'post') {
            response = await axios.post(host + url, data, {
                headers: headers,
                transformResponse: transformResponse,
            }).catch((e) => e.response);
        } else if (method === 'put') {
            response = await axios.put(host + url, data, {
                headers: headers,
                transformResponse: transformResponse,
            }).catch((e) => e.response);
        }  else if (method === 'delete') {
            response = await axios.delete(host + url, {
                headers: headers,
                transformResponse: transformResponse,
            }).catch((e) => e.response);
        }  else {
            response = await axios.get(host + url, {
                headers: headers,
                transformResponse: transformResponse,
            }).catch((e) => e.response);
        }

        if (response.status === 200) {
            return response.data;
        } else if (response.status === 401 && url !== '/api/auth/refresh-token') {
            let tokenRefreshResponse = await storeHook.dispatch('refreshToken', {
                token: storeHook.getters.getToken,
            });
            if (tokenRefreshResponse.success) {
                return call(url, method, data, auth);
            }
        }

        return {
            success: false,
            message: null,
            data: response,
        };
    }
    async function get(url, auth) {
        return call(url, 'get', null, auth);
    }
    async function post(url, auth, data) {
        return call(url, 'post', data, auth);
    }
    async function put(url, auth, data) {
        return call(url, 'put', data, auth);
    }
    async function del(url, auth) {
        return call(url, 'delete', null, auth);
    }

    return {
        call,
        get,
        post,
        put,
        del,
    };
};