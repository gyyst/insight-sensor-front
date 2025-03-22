// 参数接口
export interface SearchApiInfoParams {
  /* */
  current?: number

  /* */
  pageSize?: number

  /* */
  searchText?: string
}

// 响应接口
export interface SearchApiInfoRes {
  /* */
  code: number

  /* */
  data: {
    /* */
    records: {
      /* */
      id: string

      /* */
      name: string

      /* */
      description: string
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
  }

  /* */
  message: string
}

// 参数接口
export interface InvokeOnlineApiParams {
  /* */
  apiId: number

  /* */
  requestParams?: {
    /* */
    name?: string

    /* */
    description?: string

    /*可用值:INTEGER,LONG,STRING,OBJECT */
    dataType?: string

    /* */
    isNeed?: boolean

    /* */
    value?: Record<string, unknown>

    /* */
    map?: Record<string, unknown>
  }[]

  /* */
  requestBody?: {
    /* */
    name?: string

    /* */
    description?: string

    /*可用值:INTEGER,LONG,STRING,OBJECT */
    dataType?: string

    /* */
    isNeed?: boolean

    /* */
    value?: Record<string, unknown>

    /* */
    map?: Record<string, unknown>
  }[]

  /* */
  requestHeader?: {
    /* */
    name?: string

    /* */
    description?: string

    /*可用值:INTEGER,LONG,STRING,OBJECT */
    dataType?: string

    /* */
    isNeed?: boolean

    /* */
    value?: Record<string, unknown>

    /* */
    map?: Record<string, unknown>
  }[]
}

// 参数接口
export interface AddApiInfoParams {
  /* */
  name: string

  /* */
  description?: string

  /*可用值:HTTP,HTTPS */
  protocolHeader: string

  /* */
  host: string

  /* */
  price: number

  /* */
  port?: number

  /* */
  path?: string

  /* */
  requestParams?: {
    /* */
    name?: string

    /* */
    description?: string

    /*可用值:INTEGER,LONG,STRING,OBJECT */
    dataType?: string

    /* */
    isNeed?: boolean
  }[]

  /* */
  requestBody?: {
    /* */
    name?: string

    /* */
    description?: string

    /*可用值:INTEGER,LONG,STRING,OBJECT */
    dataType?: string

    /* */
    isNeed?: boolean
  }[]

  /* */
  requestHeader?: {
    /* */
    name?: string

    /* */
    description?: string

    /*可用值:INTEGER,LONG,STRING,OBJECT */
    dataType?: string

    /* */
    isNeed?: boolean
  }[]

  /* */
  responseBody?: {
    /* */
    name?: string

    /* */
    description?: string

    /*可用值:INTEGER,LONG,STRING,OBJECT */
    dataType?: string

    /* */
    isNeed?: boolean
  }[]

  /* */
  responseHeader?: {
    /* */
    name?: string

    /* */
    description?: string

    /*可用值:INTEGER,LONG,STRING,OBJECT */
    dataType?: string

    /* */
    isNeed?: boolean
  }[]

  /*可用值:GET,POST,PUT,DELETE,HEAD,PATCH */
  method: string
}
