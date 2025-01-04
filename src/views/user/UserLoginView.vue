<template>
  <div id="userLoginView">
    <h1 class="title">用户登录</h1>
    <h3 class="desc">企业级智能云图库</h3>
    <a-form
      :model="loginForm"
      name="basic"
      autocomplete="off"
      @finish="submit"
      @finishFailed="fail"
    >
      <a-form-item
        label="账号"
        name="username"
        :rules="[{ required: true, message: '请输入账号！' }]"
      >
        <a-input v-model:value="loginForm.username" placeholder="请输入账号" allow-clear>
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        label="密码"
        name="password"
        :rules="[{ required: true, message: '请输入密码!' }]"
      >
        <a-input-password v-model:value="loginForm.password" placeholder="请输入密码" allow-clear>
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>
      <div class="register">
        <span class="tips">没有账号？</span>
        <router-link to="/user/register">点我注册</router-link>
      </div>
      <a-form-item class="login">
        <a-button style="width: 90%" type="primary" html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { message } from 'ant-design-vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import router from '@/router'
import { doLoginUsingPost } from '@/api/userController.ts'
import { reactive } from 'vue'
import { useUserStore } from '@/stores/userStore.ts'
import { startExpirationChecker } from '@/util'

const userStore = useUserStore()
const loginForm = reactive({
  username: '',
  password: '',
})
const submit = async (values: any) => {
  const res = await doLoginUsingPost(values)
  if (res.code === 0) {
    message.success('登录成功')
    userStore.login(res.data)
    // 启动检查器
    await startExpirationChecker()
    await router.replace('/')
  } else {
    message.error(res.msg)
  }
}

const fail = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
</script>
<style scoped>
#userLoginView {
  max-width: 500px;
  margin: 10% auto;
}

#userLoginView .title {
  text-align: center;
  margin-bottom: 20px;
}

#userLoginView .desc {
  text-align: center;
  margin-bottom: 20px;
  color: #bbb;
}

#userLoginView .register {
  text-align: right;
  margin-bottom: 20px;
}

#userLoginView .tips {
  color: #bbb;
}

#userLoginView .login {
  text-align: center;
}
</style>
