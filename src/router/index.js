import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children:[
      {
        path: '/home/user',
        component: () => import('../components/UserManager')
      },
      {
        path: '/home/curriculum',
        component: () => import('../components/CurriculumManager')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },
  {
    path: '/sport',
    name: 'sport',
    component: () => import('../views/SportManager.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
