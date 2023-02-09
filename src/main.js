import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { createApp } from 'vue';
import App from './App.vue'
const app = createApp(App);

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
app.component('font-awesome-icon', FontAwesomeIcon)

import BaseDialog from "./components/ui/BaseDialog.vue";
app.component('BaseDialog', BaseDialog);

import router from './router.js';
app.use(router);

import store from './store.js';
app.use(store);

app.mount('#app');
