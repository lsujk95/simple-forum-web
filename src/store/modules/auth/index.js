import getters from './getters.js';
import mutations from './mutations.js';
import actions from './actions.js';

export default {
    state() {
        return {
            token: null,
            tokenExpiresAt: null,
            user: null,
        };
    },
    getters,
    mutations,
    actions,
};
