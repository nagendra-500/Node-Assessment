import Vue from 'vue';
import VueRouter from 'vue-router';
import listHome from '../components/listHome';
import login from '../components/login';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Register',
    component: login,
  },
  {
    path: '/users',
    name: 'userList',
    component: listHome,
  },
  {
    path: '/registered',
    name: 'Register',
    component: login,
  },
];

export default new VueRouter({
  routes,
  mode: 'history',
});
