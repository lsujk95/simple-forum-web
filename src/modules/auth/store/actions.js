import useAuth from './../hooks/auth.js';

export default {
    async restoreLogin(context) {
        const auth = localStorage.getItem('auth');
        if (auth) {
            await context.commit('setAuth', JSON.parse(auth));
        }
    },
    async logout(context) {
      await context.commit('setAuth', {
          token: null,
          tokenExpiresAt: null,
          user: null,
          userActions: null,
      });
      localStorage.clear('auth');
    },
    async login(context, payload) {
        const authHook = useAuth();
        const response = await authHook.getToken(payload.email, payload.password);
        if (response.success === true) {
            const auth = response.data;
            await context.commit('setAuth', auth);
            localStorage.setItem('auth', JSON.stringify(auth));
        }

        return response;
    },
    async register(context, payload) {
        const authHook = useAuth();
        const response = await authHook.register(payload.email, payload.password, payload.name);
        if (response.success === true) {
            const auth = response.data;
            await context.commit('setAuth', auth);
            localStorage.setItem('auth', JSON.stringify(auth));
        }

        return response;
    },
    async refreshToken(context, payload) {
        const authHook = useAuth();
        const response = await authHook.refreshToken(payload.token);
        if (response.success === true) {
            const auth = response.data;
            await context.commit('setAuth', auth);
            localStorage.setItem('auth', JSON.stringify(auth));
        } else {
            await context.dispatch('logout');
        }

        return response;
    },
};