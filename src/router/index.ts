import { createRouter, createWebHistory } from 'vue-router';
import UserView from '@/views/UserView.vue';
import UserList from '@/components/UserList.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: UserList
    },
    {
      path: '/user',
      name: 'user',
      component: UserView
    }
  ]
});

export default router; 