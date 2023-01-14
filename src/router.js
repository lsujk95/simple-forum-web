import { createRouter, createWebHistory } from "vue-router";
import store from './store/index.js';

import HomePage from './pages/Home.vue';
import LoginPage from './pages/Login.vue';
import RegisterPage from './pages/Register.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: HomePage,
            name: 'home',
        },
        {
            path: '/login',
            component: LoginPage,
            name: 'login',
        },
        {
            path: '/register',
            component: RegisterPage,
            name: 'register',
            // meta: { requiresAuth: true }
        },
    ],

});

router.beforeEach((to, fro, next) => {
    const isLoggedIn = store.getters.getToken != null;
    if (to.name === 'login' && isLoggedIn) {
        console.log('login!!');
        next({ name: 'home' });
    }

    next();
});

export default router;