<template>
  <div id="userRegisterView">
    <h1 class="title">用户注册</h1>
    <h3 class="desc">企业级智能云图库</h3>
    <a-form
      :model="registerForm"
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
        <a-input v-model:value="registerForm.username" placeholder="请输入账号" allow-clear>
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
        <a-input-password
          v-model:value="registerForm.password"
          placeholder="请输入密码"
          allow-clear
        >
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item
        label="确认密码"
        name="rePassword"
        :rules="[{ required: true, message: '请输入确认密码!' }]"
      >
        <a-input-password
          v-model:value="registerForm.rePassword"
          placeholder="请输入确认密码"
          allow-clear
        >
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item class="submit">
        <a-button style="width: 90%" type="primary" html-type="submit">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import { message } from 'ant-design-vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import router from '@/router'
import { registerUserUsingPost } from '@/api/userController.ts'

const registerForm = reactive({
  username: '',
  password: '',
  rePassword: '',
})
const submit = async (values: any) => {
  if (values.password !== values.rePassword) {
    message.error('两次密码不一致')
    return
  }
  const res = await registerUserUsingPost(values)
  if (res.code === 0) {
    message.success('注册成功')
    await router.replace('/user/login')
  } else {
    message.error(res.msg)
  }
}

const fail = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

onMounted(() => {})
</script>
<style scoped>
#userRegisterView {
  max-width: 500px;
  margin: 10% auto;
}

#userRegisterView .title {
  text-align: center;
  margin-bottom: 20px;
}

#userRegisterView .desc {
  text-align: center;
  margin-bottom: 20px;
  color: #bbb;
}

#userRegisterView .submit {
  text-align: center;
}
</style>
