// 参数接口
export interface AddUserInfoParams {
  /* */
  account: string

  /* */
  password: string

  /* */
  unionId?: string

  /* */
  mpOpenId?: string

  /* */
  email: string

  /* */
  phone?: string

  /* */
  name: string

  /* */
  avatar?: string

  /* */
  profile?: string

  /* */
  roles?: string[]
}
export interface ListUserInfoParams {
  /* */
  current?: number

  /* */
  pageSize?: number

  /* */
  account?: string

  /* */
  email?: string

  /* */
  phone?: string

  /* */
  name?: string

  /* */
  profile?: string
}

export interface AddUserInfoParams {
  /* */
  account: string

  /* */
  password: string

  /* */
  unionId?: string

  /* */
  mpOpenId?: string

  /* */
  email: string

  /* */
  phone?: string

  /* */
  name: string

  /* */
  avatar?: string

  /* */
  profile?: string

  /* */
  roles?: string[]
}
export interface DeleteUserInfoRequest {
  id?: string
}

export interface UpdateUserInfoRequest {
  /* */
  id?: string

  /* */
  name: string

  /* */
  avatar: string

  /* */
  profile?: string

  /* */
  roles?: string[]
}
export interface ListUserInfoRes {
  /* */
  records: {
    /* */
    id: number

    /* */
    roles: string[]

    /* */
    email: string

    /* */
    phone: string

    /* */
    name: string

    /* */
    avatar: string

    /* */
    profile: string

    /* */
    state: number

    /* */
    stateString: string
  }[]

  /* */
  pageNumber: number

  /* */
  pageSize: number

  /* */
  totalPage: number

  /* */
  totalRow: number

  /* */
  optimizeCountQuery: boolean

  /* */
  empty: boolean
}
export interface UserInfo {
  /* */
  id: string

  /* */
  roles: Record<string, unknown>[]

  /* */
  email: string

  /* */
  phone: string

  /* */
  name: string

  /* */
  avatar: string

  /* */
  profile: string

  /* */
  state: number

  /* */
  stateString: string
}
