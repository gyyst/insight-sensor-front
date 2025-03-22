export interface LoginRequestData {
  remember?: boolean
  account?: string
  password?: string
  code?: string
}
export interface RegisterRequestData {
  userAccount?: string
  userPassword?: string
  checkPassword?: string
}

export interface UserLoginRes {
  createTime: Record<string, unknown>
  id: number
  tokenInfo: {
    isLogin: boolean
    loginDevice: string
    loginId: Record<string, unknown>
    loginType: string
    sessionTimeout: number
    tag: string
    tokenActivityTimeout: number
    tokenName: string
    tokenSessionTimeout: number
    tokenTimeout: number
    tokenValue: string
  }
  updateTime: Record<string, unknown>
  avatar: string
  name: string
  profile: string
  roles: string[]
}

export type LoginCodeResponseData = ApiResponseData<string>

export type LoginResponseData = ApiResponseData<UserLoginRes>

export type UserInfoResponseData = ApiResponseData<UserLoginRes>
