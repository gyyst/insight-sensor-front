// @ts-ignore

export interface AddChartParams {
  chartData?: string
  chartType?: string
  goal?: string
  name?: string
}

export interface GetChartDataRequest {
  /** 当前页码 */
  current: number
  /** 查询条数 */
  pageSize: number
  /** 查询参数：用户名 */
  name?: string
  /** 查询参数：手机号 */
  goal?: string

  userId?: number
}

export interface CreateChartRequest {
  chartData?: string
  chartType?: string
  goal?: string
  name?: string
}

export interface DeleteChartRequest {
  id?: string
}

export interface UpdateChartRequest {
  chartData?: string
  chartType?: string
  genChart?: string
  genResult?: string
  goal?: string
  id?: string | undefined
  name?: string
}

export interface GetChartData {
  countId: string
  current: number
  maxLimit: number
  optimizeCountSql: boolean
  orders: {
    asc: boolean
    column: string
  }[]
  pages: number
  records: {
    /* */
    chartData: {
      /* */
      primaryKeys: {
        /* */
        keyColumn: string

        /*可用值:Auto,Sequence,Generator,None */
        keyType: string

        /* */
        value: string

        /* */
        before: boolean
      }[]

      /* */
      updates: Record<string, unknown>

      /* */
      insertAttrs: Record<string, unknown>[]

      /* */
      empty: boolean
    }[]
    chartType: string
    createTime: Record<string, unknown>
    genChart: string
    genResult: string
    goal: string
    id: number
    isDelete: number
    name: string
    updateTime: Record<string, unknown>
    userId: number
  }[]
  searchCount: boolean
  size: number
  total: number
}

export interface Chart {
  /* */
  chartData: {
    /* */
    primaryKeys: {
      /* */
      keyColumn: string

      /*可用值:Auto,Sequence,Generator,None */
      keyType: string

      /* */
      value: string

      /* */
      before: boolean
    }[]

    /* */
    updates: Record<string, unknown>

    /* */
    insertAttrs: Record<string, unknown>[]

    /* */
    empty: boolean
  }[]
  columns: Array<string>
  chartType: string
  createTime: Record<string, unknown>
  genChart: string
  genResult: string
  goal: string
  id: number
  status: number
  execMessage: string
  isDelete: number
  name: string
  updateTime: Record<string, unknown>
  userId: number
}
