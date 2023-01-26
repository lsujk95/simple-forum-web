import useBackend from './../../../hooks/backend.js';

export default function useThread() {
    const backendHook = useBackend();

    async function getThread(id) {
        return await backendHook.get('/api/threads/' + id + '?withReplies=1', false);
    }

    return {
        getThread,
    };
};