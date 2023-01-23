import useBackend from './backend.js';

export default function useReply() {
    const backend = useBackend();

    async function addReply(threadId, content) {
        return await backend.post('/api/replies', true, {
            'thread_id': threadId,
            'content': content,
        });
    }

    async function updateReply(id, content) {
        return await backend.put('/api/replies/' + id, true, {
            'content': content,
        });
    }

    async function removeReply(id) {
        return await backend.del('/api/replies/' + id, true);
    }

    return {
        addReply,
        updateReply,
        removeReply,
    };
};