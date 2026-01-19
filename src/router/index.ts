import { createRouter, createWebHistory } from 'vue-router'

import AuthLayout from '@/layouts/AuthLayout.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

import LoginPage from '@/pages/auth/LoginPage.vue'
import Dashboard from '@/pages/Dashboard.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      component: AuthLayout,
      children: [
        {
          path: '',
          name: 'Login',
          component: LoginPage
        }
      ]
    },
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: Dashboard
        }
      ]
    }
  ]
})
