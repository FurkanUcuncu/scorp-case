import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './index.css';
import App from './App.vue';
import { createRouter } from 'vue-router';
import { createWebHistory } from 'vue-router';
import UserView from '@views/UserView.vue';
import HomeView from '@views/HomeView.vue';

const routes = [
    { path: '/', component: HomeView },
    { path: '/about', component: UserView },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount('#app')