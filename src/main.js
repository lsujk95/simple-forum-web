import { createApp } from 'vue';

import router from './router.js';
import store from './store.js';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import App from './App.vue'
import BaseDialog from "./components/ui/BaseDialog.vue";

const app = createApp(App);

app.component('BaseDialog', BaseDialog);

app.use(router);
app.use(store);

app.mount('#app');
