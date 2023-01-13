import { createRouter, createWebHistory } from "vue-router";

import HomePage from './pages/Home.vue';
import LoginPage from './pages/Login.vue';
import RegisterPage from './pages/Register.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: HomePage
        },
        {
            path: '/login',
            component: LoginPage
        },
        {
            path: '/register',
            component: RegisterPage
        },
    ],
});

export default router;