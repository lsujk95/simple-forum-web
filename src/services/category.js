import axios from "axios";
import camelcaseKeys from "camelcase-keys";

export default {
    async getCategories() {
        return await axios.get('http://127.0.0.1:8000/api/categories/?withForums=1', {
            headers: {
                'Accept': 'application/json',
                'Accept-Language': 'pl',
                'Device-Name': 'webapp',
            },
            transformResponse: [(data) => {
                return camelcaseKeys(JSON.parse(data), { deep: true })
            }],
        });
    }
}