// 全局前置守卫
import router from '@/router'
import { CURRENT_USER } from '@/constant'
import { message } from 'ant-design-vue'
import { checkLogin } from '@/util'

router.beforeEach((to, from, next) => {
  // 若是登录页面，直接放行
  if (to.path === '/user/login' || to.path === '/user/register') {
    next()
    return
  }
  if (!checkLogin()) {
    message.error('请先登录')
    next('/user/login')
    return
  }
  // 判断有无权限
  if (localStorage.getItem(CURRENT_USER)) {
    const role = JSON.parse(localStorage.getItem(CURRENT_USER)).role
    if (to.meta.role && to.meta.role !== role) {
      message.error('无权限访问')
      next(from.path)
      return
    }
  }
  next()
})
