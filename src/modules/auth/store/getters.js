export default {
    getToken(state) {
      return state.token;
    },
    getTokenExpiresAt(state) {
        return state.tokenExpiresAt;
    },
    getUser(state) {
        return state.user;
    },
    getUserActions(state) {
        return state.userActions;
    },
};