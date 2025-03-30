<script lang="ts" setup>
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { useUserStore } from "@/store/modules/user"
import { ElMessage, type FormInstance, FormRules } from "element-plus"
import { User, Lock, Message } from "@element-plus/icons-vue"
import { RegisterRequestData, SendRegisterEmailParams } from "@/api/login/types/login"
import ThemeSwitch from "@/components/ThemeSwitch/index.vue"
import { sendRegisterEmail } from "@/api/login"

const router = useRouter()

/** 登录表单元素的引用 */
const loginFormRef = ref<FormInstance | null>(null)

/** 登录按钮 Loading */
const loading = ref(false)
/** 发送验证码按钮 Loading */
const sendingCode = ref(false)
/** 倒计时 */
const countdown = ref(0)
/** 定时器 */
const timer = ref<number | null>(null)

/** 登录表单数据 */
const registerFormData = reactive<RegisterRequestData & { checkPassword: string }>({
  account: "",
  email: "",
  password: "",
  validCode: undefined,
  name: "",
  checkPassword: "",
  roles: []
})

/** 登录表单校验规则 */
const registerFormRules: FormRules = {
  account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { type: "email", message: "请输入正确的邮箱格式", trigger: "blur" }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
  ],
  checkPassword: [
    { required: true, message: "请重复密码", trigger: "blur" },
    { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
  ],
  validCode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
  name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
  roles: [{ required: true, message: "请选择用户身份", trigger: "change" }]
}

/** 发送验证码 */
const sendCode = () => {
  if (!registerFormData.email) {
    ElMessage.warning("请先输入邮箱")
    return
  }

  // 验证邮箱格式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(registerFormData.email)) {
    ElMessage.warning("请输入正确的邮箱格式")
    return
  }

  sendingCode.value = true
  const params: SendRegisterEmailParams = {
    email: registerFormData.email
  }

  sendRegisterEmail(params)
    .then(() => {
      ElMessage.success("验证码已发送到您的邮箱")
      // 开始倒计时
      countdown.value = 60
      startCountdown()
    })
    .catch(() => {
      ElMessage.error("验证码发送失败，请稍后重试")
    })
    .finally(() => {
      sendingCode.value = false
    })
}

/** 开始倒计时 */
const startCountdown = () => {
  if (timer.value) {
    clearInterval(timer.value)
  }

  timer.value = window.setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    } else {
      if (timer.value) {
        clearInterval(timer.value)
        timer.value = null
      }
    }
  }, 1000)
}

/** 注册逻辑 */
const handleLogin = () => {
  loginFormRef.value?.validate((valid: boolean, fields) => {
    if (valid) {
      if (registerFormData.password != registerFormData.checkPassword) {
        ElMessage.warning("两次输入密码不一致")
        return
      }
      loading.value = true

      // 构建注册请求数据
      const registerData: RegisterRequestData = {
        account: registerFormData.account,
        email: registerFormData.email,
        password: registerFormData.password,
        validCode: Number(registerFormData.validCode),
        name: registerFormData.name,
        roles: registerFormData.roles
      }

      useUserStore()
        .register(registerData)
        .then(() => {
          ElMessage.success("注册成功")
          router.push({ path: "/login" })
        })
        .catch(() => {
          registerFormData.password = ""
          registerFormData.checkPassword = ""
        })
        .finally(() => {
          loading.value = false
        })
    } else {
      console.error("表单校验不通过", fields)
    }
  })
}
</script>

<template>
  <div class="login-container">
    <ThemeSwitch class="theme-switch" />
    <div class="login-card">
      <div class="title">
        <img src="@/assets/layout/logo-text-2.png" />
      </div>
      <div class="content">
        <el-form ref="loginFormRef" :model="registerFormData" :rules="registerFormRules" @keyup.enter="handleLogin">
          <el-form-item prop="account">
            <el-input v-model.trim="registerFormData.account" placeholder="用户名" type="text" tabindex="1"
              :prefix-icon="User" size="large" />
          </el-form-item>
          <el-form-item prop="name">
            <el-input v-model.trim="registerFormData.name" placeholder="昵称" type="text" tabindex="2" :prefix-icon="User"
              size="large" />
          </el-form-item>
          <el-form-item prop="email">
            <el-input v-model.trim="registerFormData.email" placeholder="邮箱" type="email" tabindex="3"
              :prefix-icon="Message" size="large" />
          </el-form-item>
          <el-form-item prop="validCode">
            <div class="flex">
              <el-input v-model.trim="registerFormData.validCode" placeholder="验证码" type="text" tabindex="4"
                size="large" class="w-75 mr-2" />
              <el-button :loading="sendingCode" :disabled="countdown > 0" type="primary" @click="sendCode"
                class="w-25">{{ countdown
          > 0 ? `${countdown}秒后重试` : '获取验证码' }}</el-button>
            </div>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model.trim="registerFormData.password" placeholder="密码" type="password" tabindex="5"
              :prefix-icon="Lock" size="large" show-password />
          </el-form-item>
          <el-form-item prop="checkPassword">
            <el-input v-model.trim="registerFormData.checkPassword" placeholder="确认密码" type="password" tabindex="6"
              :prefix-icon="Lock" size="large" show-password />
          </el-form-item>

          <el-form-item prop="roles" label="请选择用户身份">
            <el-radio-group v-model="registerFormData.roles[0]" class="w-100">
              <el-radio label="manufacturer">制造商</el-radio>
              <el-radio label="user">普通用户</el-radio>
            </el-radio-group>
          </el-form-item>

          <div class="flex justify-between mb-4">
            <el-button class="shorten-button" type="primary" size="default" @click="$router.push('/login')"
              text>已完成注册？返回登录页</el-button>
          </div>

          <el-button :loading="loading" type="primary" size="large" @click.prevent="handleLogin">注册</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.shorten-button {
  width: fit-content;
  float: right;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;

  .theme-switch {
    position: fixed;
    top: 5%;
    right: 5%;
    cursor: pointer;
  }

  .login-card {
    width: 480px;
    border-radius: 20px;
    box-shadow: 0 0 10px #dcdfe6;
    background-color: #fff;
    overflow: hidden;

    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 150px;

      img {
        height: 100%;
      }
    }

    .content {
      padding: 20px 50px 50px 50px;

      :deep(.el-input-group__append) {
        padding: 0;
        overflow: hidden;

        .el-image {
          width: 100px;
          height: 40px;
          border-left: 0px;
          user-select: none;
          cursor: pointer;
          text-align: center;
        }
      }

      .el-button {
        width: 100%;
        margin-top: 10px;
      }

      .flex {
        display: flex;
      }

      .flex-1 {
        flex: 1;
      }

      .mr-2 {
        margin-right: 8px;
      }
    }
  }
}
</style>
