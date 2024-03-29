import Vue from 'vue'
import VueRouter from 'vue-router'

import BottomPopup from "../components/BottomPopup";
import Home from "../views/Home";
import Search from "../views/Search";
import Add from "../views/Add";
import Organizations from "../views/Organizations";
import Login from "../views/Login";
import Register from "../views/Register";
import About from "../views/About";
import HowTo from "../views/HowTo";
import Logout from "../views/Logout";
import Notice from "../views/Notice";

Vue.use(VueRouter);

  const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
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
      component:Add
    },
    {
      path: '/orgs',
      name: 'Organizations',
      component:Organizations
    },
    {
      path: '/login',
      name: 'LogIn',
      component:Login
    },
    {
      path: '/reg',
      name: 'Register',
      component:Register
    },

    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: About
    },
    {
      path: '/howto',
      name: 'HowTo',
      component: HowTo
    },
    {
      path: '*',
      name: 'NotFound',
      props:{text:"Page Not found"},
      component: Notice
    },
    {
      path: '/logout',
      name: 'LogOut',
      component: Logout
    },
    {
      path: '/notice',
      name: 'Notice',
      props: true,
      component: Notice
    }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
