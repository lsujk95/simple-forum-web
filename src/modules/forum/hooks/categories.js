import useBackend from './../../../hooks/backend.js';

export default function useCategories() {
    const backendHook = useBackend();

    async function getCategories() {
        return await backendHook.get('api/categories/?withForums=1', false);
    }

    return {
        getCategories,
    };
};