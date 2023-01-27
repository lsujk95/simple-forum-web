import useBackend from './../../../hooks/backend.js';

export default function useThread() {
    const backendHook = useBackend();

    async function createThread(name, content, forumId) {
        return await backendHook.post('/api/threads', true, {
            name: name,
            content: content,
            forum_id: forumId,
        });
    }

    async function updateThread(id, name, content) {
        return await backendHook.put('/api/threads/' + id, true, {
            name: name,
            content: content,
        });
    }

    async function getThread(id) {
        return await backendHook.get('/api/threads/' + id + '?withReplies=1', false);
    }

    return {
        createThread,
        updateThread,
        getThread,
    };
};