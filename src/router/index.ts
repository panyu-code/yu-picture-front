import { createRouter, createWebHistory } from 'vue-router'

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
    {
      path: '/picture/manage',
      name: 'picture-manager',
      component: () => import('@/views/picture/PictureManageView.vue'),
      meta: { role: 1 },
    },
    {
      path: '/picture/add',
      name: 'picture-add',
      component: () => import('@/views/picture/PictureAddView.vue'),
    },
    {
      path: '/picture/detail/:id',
      name: '图片详情',
      component: () => import('@/views/picture/PictureDetailView.vue'),
      props: true,
    },
  ],
})

export default router
