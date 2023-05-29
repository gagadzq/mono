
<template>
  <div class="login-page">
    <div class="login-wrap">
      <h1 class="login-title">爬爬博客管理系统</h1>
      <img src="../../assets/images/login-icon.png" class="login-icon">
      <div>
        <el-form :model="form" ref="loginFormRef" :rules="rules" label-width="0">
          <el-form-item prop="account" :error="accountError">
            <el-input
              v-model="form.account"
              placeholder="请输入账号"
              :maxLength="20"
              :prefix-icon="UserFilled"
              @keydown.enter="onSubmit(loginFormRef)"
              clearable
            />
          </el-form-item>
          <el-form-item prop="password" :error="pwdError">
            <el-input
              v-model="form.password"
              placeholder="请输入密码"
              type="password"
              :maxLength="20"
              :prefix-icon="Unlock"
              @keydown.enter="onSubmit(loginFormRef)"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              style="width: 100%"
              :loading="submitLoading"
              @click="onSubmit(loginFormRef)">登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router';
import { UserFilled, Unlock } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { login } from '@/apis/user'
import { Encrypt } from '@/utils/crypto'

const accountError = ref('')
const pwdError = ref('')
const router = useRouter()

// login
const form = reactive({
  account: '',
  password: '',
})
const loginFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  account: [
    { required: true, message: '请输入账号', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度应该在6-20位之间', trigger: 'blur' },
  ],
})

const submitLoading = ref(false)
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      submitLoading.value = true
      await handleLogin()
      submitLoading.value = false
    }
  })
}

const handleLogin = async () => {
  login({
    username: form.account,
    password: Encrypt(form.password)
  }).then(data => {
    const { code } = data
    if (code === 200) {
      localStorage.setItem("access_token", data.data)
      router.push('/home')
      return
    }
    if (code === 1001) {
      accountError.value = data.message
    }
    if (code === 1002) {
      pwdError.value = data.message
    }
  })
}
</script>

<style lang="less">
.login-page {
  height: 100%;
  background: rgb(229, 238, 253);
}
.login-wrap {
  width: 370px;
  height: 150px;
  padding: 38px;
  position: fixed;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: var(--el-box-shadow-light);
  border-radius: 5px;
  background: #FFF;
  .login-title {
    position: absolute;
    font-size: 18px;
    top: -38px;
    font-weight: normal;
    left: 0;
    color: #264567;
    letter-spacing: 3px;
  }
  .login-icon {
    position: absolute;
    top: -159px;
    right: 0;
    width: 200px;
  }
}
</style>