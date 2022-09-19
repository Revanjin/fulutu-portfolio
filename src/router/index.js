import { createRouter, createWebHistory } from 'vue-router';
import BasePage from '../views/BasePage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: BasePage,
  },
  {
    path: '/about',
    name: 'about',
    component: BasePage,
  },
  {
    path: '/about/:name',
    name: 'about-detail',
    component: BasePage,
  },
  {
    path: '/projects',
    name: 'Projects',
    component: BasePage,
  },
  {
    path: '/projects/:category',
    name: 'ProjectDetail',
    component: BasePage,
  },
  {
    path: '/about-me',
    name: 'AboutMe',
    component: BasePage,
  },
  {
    path: '/commissions',
    name: 'Commissions',
    component: BasePage,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: BasePage,
  },
  {
    path: '/imprint',
    name: 'Imprint',
    component: BasePage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
