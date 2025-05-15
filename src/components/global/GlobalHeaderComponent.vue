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
          <a-dropdown class="dropdown">
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
    <a-drawer
      v-model:open="open"
      class="custom-class"
      root-class-name="root-class-name"
      :root-style="{ color: 'blue' }"
      style="color: red"
      placement="right"
    >
      <!--  个人信息展示 -->
      <div >
        <a-descriptions title="个人信息" bordered :column="1" >
          <a-descriptions-item class="user-info-item" label="用户名">{{currentUser.username}}</a-descriptions-item>
          <a-descriptions-item class="user-info-item" label="昵称">{{currentUser.nickname}}</a-descriptions-item>
          <a-descriptions-item class="user-info-item" label="性别">{{currentUser.gender === 1 ? '男' : '女'}}</a-descriptions-item>
          <a-descriptions-item class="user-info-item" label="角色">{{currentUser.role === 1 ? '管理员' : '普通用户'}}</a-descriptions-item>
          <a-descriptions-item class="user-info-item" label="年龄">{{currentUser.age}}</a-descriptions-item>
          <a-descriptions-item class="user-info-item" label="头像"><a-avatar :size="70" :src="currentUser.avatar" /></a-descriptions-item>
          <a-descriptions-item class="user-info-item" label="手机号">{{currentUser.phone}}</a-descriptions-item>
          <a-descriptions-item class="user-info-item" label="邮箱">{{currentUser.email}}</a-descriptions-item>
          <a-descriptions-item class="user-info-item" label="注册时长">{{registerTime}}</a-descriptions-item>
        </a-descriptions>
      </div>
    </a-drawer>
  </div>
</template>
<script lang="ts" setup>
import { computed, createVNode, h, ref } from 'vue'
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
const open = ref<boolean>(false)
const currentUser = computed(() => {
  return userStore.userInfo
})
const loginFlag = computed(() => {
  return userStore.isLoggedIn
})

const registerTime = computed(() => {
  // 当前时间减去创建时间，计算成天数
  return (
    Math.floor(
      (new Date().getTime() - new Date(currentUser.value.createTime).getTime()) /
        (1000 * 60 * 60 * 24)
    ) + ' 天'
  )
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
    label: '上传图片',
    title: '上传图片',
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
  } else {
    // 查看当前登录用户信息
    open.value = true
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

.dropdown {
  cursor: pointer;
}
:deep(.ant-descriptions-item-content) {
  text-align: center;
}

:deep(.ant-descriptions-item-label) {
  font-weight: bold;
  text-align: center;
}
</style>
