import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Products from '../views/Products.vue'
import Wallet from '../views/Wallet.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/wallet',
    name: 'Wallet',
    component: Wallet
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 