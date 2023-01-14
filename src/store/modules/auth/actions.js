import axios from 'axios'

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
        const response = await axios.post('http://127.0.0.1:8000/api/auth/get-token', {
            email: payload.email,
            password: payload.password,
        }, {
            headers: {
                'Accept': 'application/json',
                'Accept-Language': 'pl',
                'Device-Name': 'webapp',
            }
        });

        if (response.data.success === true) {
            const data = response.data.data;
            const auth = {
                token: data['token'],
                tokenExpiresAt: data['token_expires_at'],
                user: {
                    id: data['user']['id'],
                    name: data['user']['name'],
                    email: data['user']['email'],
                    emailVerifiedAt: data['email_verified_at'],
                    createdAt: data['user']['created_at'],
                    updatedAt: data['user']['updated_at'],
                },
                userActions: data['user_actions'],
            };

            await context.commit('setAuth', auth);
            localStorage.setItem('auth', JSON.stringify(auth));
        }

        return response.data;
    },
    async register(context, payload) {
        const response = await axios.post('http://127.0.0.1:8000/api/auth/register', {
            email: payload.email,
            password: payload.password,
            name: payload.name,
        }, {
            headers: {
                'Accept': 'application/json',
                'Accept-Language': 'pl',
                'Device-Name': 'webapp',
            }
        });

        if (response.data.success === true) {
            const data = response.data.data;
            const auth = {
                token: data['token'],
                tokenExpiresAt: data['token_expires_at'],
                user: {
                    id: data['user']['id'],
                    name: data['user']['name'],
                    email: data['user']['email'],
                    emailVerifiedAt: data['email_verified_at'],
                    createdAt: data['user']['created_at'],
                    updatedAt: data['user']['updated_at'],
                },
                userActions: data['user_actions'],
            };

            await context.commit('setAuth', auth);
            localStorage.setItem('auth', JSON.stringify(auth));
        }

        return response.data;
    },
};