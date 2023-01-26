import useBackend from './../../../hooks/backend.js';

export default function useForum() {
    const backendHook = useBackend();

    async function getForum(id) {
        return await backendHook.get('api/forums/' + id + '?withThreads=1', false);
    }

    return {
        getForum,
    };
};