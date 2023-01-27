import useBackend from './../../../hooks/backend.js';

export default function useReply() {
    const backendHook = useBackend();

    async function createReply(threadId, content) {
        return await backendHook.post('/api/replies', true, {
            thread_id: threadId,
            content: content,
        });
    }

    async function updateReply(id, content) {
        return await backendHook.put('/api/replies/' + id, true, {
            content: content,
        });
    }

    async function removeReply(id) {
        return await backendHook.del('/api/replies/' + id, true);
    }

    return {
        createReply,
        updateReply,
        removeReply,
    };
};