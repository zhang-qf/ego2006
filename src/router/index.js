import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'
import Product from "../views/Product"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [{
      path: '/',
      name: 'Product',
      component: Product,
      meta: {
        isLog: true
      }
    },
    {
      path: '/params',
      name: 'Params',
      component: () => import('../views/Params'),
      meta: {
        isLog: true
      }
    },
    {
      path: '/content',
      name: 'Content',
      component: () => import('../views/Content'),
      meta: {
        isLog: true
      }
    },
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/ucenter",
    name: "Ucenter",
    component: () => import("../views/Ucenter.vue"),
    meta: {
      isLog: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
