import { createRouter, createWebHistory } from 'vue-router'
import { CURRENT_USER } from '@/constant/constant.ts'
import { message } from 'ant-design-vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/about/AboutView.vue'),
    },
    {
      path: '/user/login',
      name: 'user-login',
      component: () => import('@/views/user/UserLoginView.vue'),
    },
    {
      path: '/user/register',
      name: 'user-register',
      component: () => import('@/views/user/UserRegisterView.vue'),
    },
    {
      path: '/admin/manage',
      name: 'admin-manager',
      component: () => import('@/views/admin/UserManageView.vue'),
      meta: { role: 1 },
    },
  ],
})

export default router
