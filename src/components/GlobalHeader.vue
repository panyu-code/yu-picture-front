<template>
  <div id="globalHeader">
    <a-row>
      <a-col flex="200px">
        <router-link to="/">
          <div class="title-bar">
            <img class="logo" src="@/assets/jenny.jpg" alt="logo" title="logo" />
            <div class="title">鱼皮云图库</div>
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
      <a-col flex="200px">
        <div v-if="loginUserStore.LoginUser.id">
          {{ loginUserStore.LoginUser.userName ?? '无名' }}
        </div>
        <a-button v-else type="primary">登录</a-button>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
import { h, onMounted, ref } from 'vue'
import { MenuProps } from 'ant-design-vue'
import { HomeOutlined, AppstoreOutlined, ShareAltOutlined } from '@ant-design/icons-vue'
import router from '@/router'
import { useLoginUserStore } from '@/stores/loginUser.ts'

const loginUserStore = useLoginUserStore()
const current = ref<string[]>(['/'])
const items = ref<MenuProps['items']>([
  {
    key: '/',
    icon: () => h(HomeOutlined),
    label: '主页',
    title: '主页',
  },
  {
    key: '/about',
    icon: () => h(AppstoreOutlined),
    label: '关于',
    title: '关于',
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
onMounted(() => {
  setTimeout(() => {
    console.log(loginUserStore.LoginUser)
  }, 5000)
})
</script>
<style scoped>
#globalHeader .logo {
  width: 48px;
  height: 48px;
}

#globalHeader .title-bar {
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
