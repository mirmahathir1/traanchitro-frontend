import Vue from 'vue'
import VueRouter from 'vue-router'

import BottomPopup from "../components/BottomPopup";


Vue.use(VueRouter);

  const routes = [
    {
      path: '/',
      name: 'Home',
      component: ()=> import('../views/Home.vue')
    },
    {
      path: '/search',
      name: 'Search',
      component: ()=> import('../views/Search.vue'),
      children: [
        {
          path: 'details/:position',
          name: 'Details',
          component: BottomPopup
        }
      ]
    },
    {
      path: '/add',
      name: 'Add',
      component:()=> import('../views/Add.vue')
    },
    {
      path: '/orgs',
      name: 'Organizations',
      component:()=> import('../views/Organizations.vue')
    },
    {
      path: '/login',
      name: 'LogIn',
      component:()=> import('../views/Login.vue')
    },
    {
      path: '/reg',
      name: 'Register',
      component:()=> import('../views/Register.vue')
    },

    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
      path: '/howto',
      name: 'HowTo',
      component: ()=> import('../views/HowTo.vue')
    },
    {
      path: '*',
      name: 'NotFound',
      component: ()=> import('../views/NotFound.vue')
    },
    {
      path: '/logout',
      name: '/LogOut',
      component: ()=> import('../views/Logout')
    }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
