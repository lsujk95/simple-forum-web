import authService from '../../../services/auth.js';

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
        const response = await authService.login(payload.email, payload.password);
        if (response.data.success === true) {
            const auth = response.data.data;

            await context.commit('setAuth', auth);
            localStorage.setItem('auth', JSON.stringify(auth));
        }

        return response.data;
    },
    async register(context, payload) {
        const response = await authService.register(payload.email, payload.password, payload.name);
        if (response.data.success === true) {
            const auth = response.data.data;

            await context.commit('setAuth', auth);
            localStorage.setItem('auth', JSON.stringify(auth));
        }

        return response.data;
    },
};