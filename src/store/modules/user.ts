import { Ref, ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import { usePermissionStore } from "./permission"
import { useTagsViewStore } from "./tags-view"
import { getToken, removeToken, setToken } from "@/utils/cache/cookies"
import router, { resetRouter } from "@/router"
import { getUserInfoApi, loginApi, registerAPI } from "@/api/login"
import { type LoginRequestData, RegisterRequestData, UserLoginRes } from "@/api/login/types/login"
import { type RouteRecordRaw } from "vue-router"
import asyncRouteSettings from "@/config/async-route"

export const useUserStore = defineStore(
  "user",
  () => {
    const token = ref<string>(getToken() || "")
    const roles = ref<string[]>([])
    const username = ref<string>("")
    // @ts-ignore
    const userInfo: Ref<UserLoginRes> = ref({})
    const permissionStore = usePermissionStore()
    const tagsViewStore = useTagsViewStore()
    /** 设置角色数组 */
    const setRoles = (value: string[]) => {
      roles.value = value
    }
    /** 登录 */
    const login = async ({ account, password, code, remember }: LoginRequestData) => {
      const { data } = await loginApi({ account: account, password: password, code: code, remember })
      userInfo.value = data
      username.value = userInfo.value.name
      setToken(userInfo.value.tokenInfo.tokenValue)
      token.value = data.tokenInfo.tokenValue
    }
    const register = async ({ userAccount, userPassword, checkPassword }: RegisterRequestData) => {
      return await registerAPI({ userAccount, userPassword, checkPassword })
    }
    /** 获取用户详情 */
    const getInfo = async () => {
      const { data } = await getUserInfoApi()
      // 验证返回的 roles 是否为一个非空数组，否则塞入一个没有任何作用的默认角色，防止路由守卫逻辑进入无限循环
      roles.value = data.roles?.length > 0 ? data.roles : asyncRouteSettings.defaultRoles
    }
    /** 切换角色 */
    const changeRoles = async (role: string) => {
      const newToken = "token-" + role
      token.value = newToken
      setToken(newToken)
      await getInfo()
      permissionStore.setRoutes(roles.value)
      resetRouter()
      permissionStore.dynamicRoutes.forEach((item: RouteRecordRaw) => {
        router.addRoute(item)
      })
      _resetTagsView()
    }
    /** 登出 */
    const logout = () => {
      removeToken()
      token.value = ""
      roles.value = []
      resetRouter()
      _resetTagsView()
    }
    /** 重置 Token */
    const resetToken = () => {
      removeToken()
      token.value = ""
      roles.value = []
    }
    /** 重置 Visited Views 和 Cached Views */
    const _resetTagsView = () => {
      tagsViewStore.delAllVisitedViews()
      tagsViewStore.delAllCachedViews()
    }

    return { token, roles, userInfo, username, setRoles, login, register, getInfo, changeRoles, logout, resetToken }
  },
  {
    persist: true
  }
)

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}
