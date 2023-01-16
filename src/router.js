import { createRouter, createWebHistory } from "vue-router";
import store from './store/index.js';

import LoginPage from './pages/auth/Login.vue';
import RegisterPage from './pages/auth/Register.vue';

import CategoriesPage from './pages/Categories.vue';
import ForumPage from './pages/Forum.vue';
import ThreadPage from './pages/Thread.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // {
        //     path: '/',
        //     redirect: '/categories',
        //     name: 'home',
        // },
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
        {
            path: '/categories',
            alias: '/',
            component: CategoriesPage,
            name: 'categories',
        },
        {
            path: '/forums/:id',
            component: ForumPage,
            name: 'forums.details',
        },
        {
            path: '/threads/:id',
            component: ThreadPage,
            name: 'threads.details',
        }
    ],
});

router.beforeEach((to, fro, next) => {
    const isLoggedIn = store.getters.getToken != null;
    if (to.name === 'login' && isLoggedIn) {
        next({ name: 'home' });
    }

    next();
});

export default router;