import { request } from "@/utils/service"
import type * as UserCenter from "./types/userCenter"

/** 增 */
export function AddUserInfoAPI(data: UserCenter.AddUserInfoParams) {
  return request({
    url: "/user/admin/add/info",
    method: "post",
    data
  })
}

/** 删 */
export function deleteUserInfoAPI(data: UserCenter.DeleteUserInfoRequest) {
  return request({
    url: "/user/admin/delete/info/" + data.id,
    method: "post",
    data
  })
}

/** 改 */
export function updateUserInfoAPI(data: UserCenter.UpdateUserInfoRequest) {
  return request({
    url: "/user/admin/update/info",
    method: "post",
    data
  })
}

/** 查 */
export function listUserInfoAPI(data: UserCenter.ListUserInfoParams) {
  return request({
    url: "/user/admin/list/info",
    method: "post",
    data
  })
}
