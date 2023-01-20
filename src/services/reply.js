import axios from "axios";
import camelcaseKeys from "camelcase-keys";

export default {
    async addReply(authToken, threadId, content) {
        return await axios.post('http://127.0.0.1:8000/api/replies', {
            'thread_id': threadId,
            'content': content,
        }, {
            headers: {
                'Accept': 'application/json',
                'Accept-Language': 'pl',
                'Device-Name': 'webapp',
                'Authorization': 'Bearer ' + authToken,
            },
            transformResponse: [(data) => {
                return camelcaseKeys(JSON.parse(data), { deep: true })
            }],
        });
    },
    async removeReply(authToken, id) {
        return await axios.delete('http://127.0.0.1:8000/api/replies/' + id, {
            headers: {
                'Accept': 'application/json',
                'Accept-Language': 'pl',
                'Device-Name': 'webapp',
                'Authorization': 'Bearer ' + authToken,
            },
            transformResponse: [(data) => {
                return camelcaseKeys(JSON.parse(data), { deep: true })
            }],
        });
    }
}