import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoginUserStore = defineStore('loginUser', () => {
  const LoginUser = ref<any>({
    id: 0,
    userName: '未登录',
  })

  /**
   * 获取当前用户信息
   */
  async function getLoginUser() {
    /*   const res = await getCurrentUser()
       if (res.code === 0 && res.data) {
         LoginUser.value = res.data
       }*/
    // 模拟登录
    setTimeout(() => {
      LoginUser.value = {
        id: 1,
        userName: 'admin',
      }
    }, 3000)
  }

  /**
   * 设置登录用户
   * @param newLoginUser
   */
  function setLoginUser(newLoginUser: any) {
    LoginUser.value = newLoginUser
  }

  return { LoginUser, getLoginUser, setLoginUser }
})
