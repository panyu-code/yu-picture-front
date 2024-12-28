<template>
  <div id="globalHeader">
    <a-row>
      <a-col flex="20%">
        <router-link to="/">
          <div class="title-bar">
            <img class="logo" src="../../assets/jenny.jpg" alt="logo" title="logo" />
            <div class="title">智能云图库</div>
          </div>
        </router-link>
      </a-col>
      <a-col flex="auto">
        <a-menu
          v-model:selectedKeys="current"
          mode="horizontal"
          :items="items"
          @click="changeMenu"
        />
      </a-col>
      <a-col flex="5%">
        <div v-if="loginFlag">
          <a-dropdown>
            <a-space>
              <a-avatar style="cursor: pointer" :size="50" :src="currentUser.avatar" />
              {{ currentUser.username ?? '无名' }}
            </a-space>
            <template #overlay>
              <a-menu @click="onClick">
                <a-menu-item key="info">
                  <span>个人信息</span>
                </a-menu-item>
                <a-menu-item key="logout">
                  <span>退出登录</span>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
        <a-button v-else type="primary" @click="toLogin">登录</a-button>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
import { computed, createVNode, h, onBeforeMount, onMounted, ref } from 'vue'
import { MenuProps, message, Modal } from 'ant-design-vue'
import {
  HomeOutlined,
  AppstoreOutlined,
  ShareAltOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons-vue'
import router from '@/router'
import { doLogoutUsingPost } from '@/api/userController.ts'
import { useUserStore } from '@/stores/userStore.ts'

const userStore = useUserStore()
const currentUser = computed(() => {
  return userStore.userInfo
})
const loginFlag = computed(() => {
  return userStore.isLoggedIn
})
const current = ref<string[]>(['/'])
const items = ref<MenuProps['items']>([
  {
    key: '/',
    icon: () => h(HomeOutlined),
    label: '主页',
    title: '主页',
  },
  {
    key: '/picture/add',
    icon: () => h(HomeOutlined),
    label: '创建图片',
    title: '创建图片',
  },
  {
    key: '/admin/manage',
    icon: () => h(AppstoreOutlined),
    label: '用户管理',
    title: '用户管理',
  },
  {
    key: '/picture/manage',
    icon: () => h(AppstoreOutlined),
    label: '图片管理',
    title: '图片管理',
  },
  {
    key: 'others',
    icon: () => h(ShareAltOutlined),
    label: h('a', { href: 'https://www.codefather.cn', target: '_blank' }, '编程导航'),
    title: '编程导航',
  },
])
const changeMenu = (key) => {
  router.replace(key.key)
}
router.afterEach((to) => {
  current.value = [to.path]
})

const toLogin = () => {
  router.replace('/user/login')
}

const onClick: MenuProps['onClick'] = ({ key }) => {
  if (key === 'logout') {
    Modal.confirm({
      title: '您确认要退出吗?',
      icon: createVNode(ExclamationCircleOutlined),
      okText: '确认',
      cancelText: '取消',
      onOk() {
        doLogoutUsingPost()
          .then((res) => {
            if (res.code === 0) {
              userStore.logout()
              message.success('退出成功')
              router.replace('/user/login')
            }
          })
          .catch(() => {
            message.error('退出失败')
          })
      },
    })
  }
}
</script>
<style scoped>
#globalHeader .logo {
  width: 48px;
  height: 48px;
}

#globalHeader .title-bar {
  margin-left: 5%;
  display: flex;
  align-items: center;
}

#globalHeader .title {
  margin-left: 8px;
  font-size: 20px;
  font-weight: bolder;
  color: #1890ff;
}
</style>
