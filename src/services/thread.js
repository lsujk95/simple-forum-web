import axios from "axios";
import camelcaseKeys from "camelcase-keys";

export default {
    async getThread(id) {
        return await axios.get('http://127.0.0.1:8000/api/threads/' + id + '?withReplies=1', {
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