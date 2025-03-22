import { request } from "@/utils/service"
import type * as Login from "./types/login"

/** 获取登录验证码 */
export function getLoginCodeApi() {
  return "https://dummyimage.com/100x40/dcdfe6/000000.png&text=V3Admin"

  // axios<Login.LoginCodeResponseData>({
  //   url: "login/code",
  //   method: "get"
  // })
}

/** 注册 */
export function registerAPI(data: Login.RegisterRequestData) {
  return request({
    url: "user/common/register",
    method: "post",
    data
  })
}

/** 登录并返回 Token */
export function loginApi(data: Login.LoginRequestData) {
  return request<Login.LoginResponseData>({
    url: "/user/login",
    method: "post",
    data
  })
}

/** 获取用户详情 */
export function getUserInfoApi() {
  return request<Login.UserInfoResponseData>({
    url: "user/common/info",
    method: "get"
  })
}
