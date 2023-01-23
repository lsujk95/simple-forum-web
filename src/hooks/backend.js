import axios from "axios";
import camelcaseKeys from "camelcase-keys";
import { useStore } from "vuex";
import config from "./../config.js";

export default function useBackend() {
    const store = useStore();

    async function call(url, method = 'post', data = null, auth = false) {
        const host = config.host;
        const transformResponse = [(data) => {
            return camelcaseKeys(JSON.parse(data), { deep: true })
        }];

        let headers = {
            'Accept': 'application/json',
            'Accept-Language': 'pl',
            'Device-Name': 'webapp',
        };

        if (auth === true) {
            headers['Authorization'] = 'Bearer ' + store.getters.getToken;
        }

        if (method === 'post') {
            return await axios.post(host + url, data, {
                headers: headers,
                transformResponse: transformResponse,
            });
        } else if (method === 'put') {
            return await axios.put(host + url, data, {
                headers: headers,
                transformResponse: transformResponse,
            });
        }  else if (method === 'delete') {
            return await axios.delete(host + url, {
                headers: headers,
                transformResponse: transformResponse,
            });
        }  else {
            return await axios.get(host + url, {
                headers: headers,
                transformResponse: transformResponse,
            });
        }
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