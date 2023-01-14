export default {
    setAuth(state, payload) {
        state.token = payload.token;
        state.tokenExpiresAt = payload.tokenExpiresAt;
        state.user = payload.user;
        state.userActions = payload.userActions;
    }
};