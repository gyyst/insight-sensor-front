export interface LoginRequestData {
  remember?: boolean
  account?: string
  password?: string
  code?: string
}
// 参数接口
export interface SendRegisterEmailParams {
  /* */
  email: string;
}

// 参数接口
export interface RegisterRequestData {
  /* */
  account: string;

  /* */
  email: string;

  /* */
  password: string;

  /* */
  validCode: number;

  /* */
  name: string;

  /* */
  userAvatar?: string;

  /* */
  userProfile?: string;

  /* */
  roles: string[];
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
