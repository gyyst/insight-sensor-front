<script lang="ts" setup>
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import { useUserStore } from "@/store/modules/user"
import logo from "@/assets/logo.svg"

const baseUrl = "/oj"
const routers = ref([
  { name: "主页", path: baseUrl + "/home" },
  { name: "添加题目", path: baseUrl + "/add/question" },
  { name: "管理题目", path: baseUrl + "/manage/question" },
  { name: "题目", path: baseUrl + "/q" },
  { name: "关于", path: baseUrl + "/about" }
])
const router = useRouter()
onMounted(() => {})
const handleMenuClick = (key: string) => {
  console.log(key)
  router.push(key)
}
const userStore = useUserStore()
/** 登出 */
const logout = () => {
  userStore.logout()
  router.push("/login")
}
</script>

<template>
  <a-row :wrap="false" a align="center">
    <a-col flex="auto">
      <a-menu :default-selected-keys="['/home']" mode="horizontal" @menu-item-click="handleMenuClick">
        <a-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }" disabled>
          <div class="titleBar">
            <img :src="logo" alt="" class="logo" />
            <div class="title">Insight OJ</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in routers" :key="item.path">{{ item.name }}</a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px" style="background: #fff">
      <a-dropdown>
        <a-avatar trigger-type="mask">
          <img :src="userStore.userInfo.avatar" alt="avatar" />
          <template #trigger-icon />
        </a-avatar>
        <template #content>
          <a-doption disabled>
            <div>用户名:{{ userStore.userInfo.name }}</div>
          </a-doption>
          <a-doption>
            <div>
              <span style="display: block" @click="logout">退出登录</span>
            </div>
          </a-doption>
        </template>
      </a-dropdown>
    </a-col>
  </a-row>
</template>

<style lang="scss" scoped>
#globalHeader {
  color: #fff;
}

.titleBar {
  display: flex;
  align-items: center;
}

.title {
  color: #444;
}

.logo {
  height: 70px;
  width: 70px;
}
</style>
