// stores/user.js
import { defineStore } from 'pinia'
import { CURRENT_USER } from '@/constant/constant.ts'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: JSON.parse(localStorage.getItem(CURRENT_USER)) || null,
    isLoggedIn: !!localStorage.getItem(CURRENT_USER),
  }),

  actions: {
    login(user) {
      this.userInfo = user
      this.isLoggedIn = true
      localStorage.setItem(CURRENT_USER, JSON.stringify(user))
    },

    logout() {
      this.userInfo = null
      this.isLoggedIn = false
      localStorage.removeItem(CURRENT_USER)
    },

    updateUser(user) {
      this.userInfo = user
      localStorage.setItem(CURRENT_USER, JSON.stringify(user))
    },
  },

  getters: {
    getUserInfo: (state) => state.userInfo,
    getLoginStatus: (state) => state.isLoggedIn,
  },
})
