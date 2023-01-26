import { createApp } from 'vue';

import router from './router.js';
import store from './store.js';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import App from './App.vue'

const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app');
