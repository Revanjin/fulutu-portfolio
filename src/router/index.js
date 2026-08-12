import { createRouter, createWebHistory } from 'vue-router';
import BasePage from '../views/BasePage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: BasePage,
    meta: {
      enterClass: 'animate__animated animate__fadeIn',
      leaveClass: 'animate__animated animate__fadeOut',
    },
  },
  {
    path: '/:catchAll(.*)',
    component: BasePage,
    meta: {
      enterClass: 'animate__animated animate__fadeIn',
      leaveClass: 'animate__animated animate__fadeOut',
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
