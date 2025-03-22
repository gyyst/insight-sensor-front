// 参数接口
export interface AddQuestionParams {
  /* */
  title: string

  /* */
  content: string

  /*可用值:EASY,MEDIUM,HARD */
  difficulty: string

  /* */
  tag?: Array<string>

  /* */
  answer?: string

  /* */
  judgeCase?: {
    /* */
    input?: string

    /* */
    output?: string
  }[]

  /* */
  judgeConfig?: {
    /* */
    timeLimit?: Record<string, unknown>

    /* */
    memoryLimit?: Record<string, unknown>

    /* */
    stackLimit?: Record<string, unknown>
  }[]
}

// 参数接口
export interface ListQuestionByPageParams {
  /* */
  current?: number

  /* */
  pageSize?: number

  /* */
  id?: number

  /* */
  title?: string

  /* */
  content?: string

  /* */
  tag?: Record<string, unknown>[]

  /* */
  uploader?: number
}

// 响应接口
export interface ListQuestionByPageRes {
  /* */
  code: number

  /* */
  data: {
    /* */
    records: {
      /* */
      id: number

      /* */
      title: string

      /* */
      content: string

      /*可用值:EASY,MEDIUM,HARD */
      difficulty: string

      /* */
      answer: string

      /* */
      judgeCase: {
        /* */
        input: string

        /* */
        output: string
      }[]

      /* */
      judgeConfig: {
        /* */
        timeLimit: number

        /* */
        memoryLimit: number

        /* */
        stackLimit: number
      }[]

      /* */
      tag: Record<string, unknown>[]

      /* */
      uploader: number
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
export interface DeleteQuestionParams {
  /* */
  id: number
}

// 参数接口
export interface UpdateQuestionParams {
  /* */
  id: number

  /* */
  title: string

  /* */
  content: string

  /*可用值:EASY,MEDIUM,HARD */
  difficulty?: string

  /* */
  tag?: Record<string, unknown>[]

  /* */
  answer?: string

  /* */
  judgeCase?: {
    /* */
    input?: string

    /* */
    output?: string
  }[]

  /* */
  judgeConfig?: {
    /* */
    timeLimit?: Record<string, unknown>

    /* */
    memoryLimit?: Record<string, unknown>

    /* */
    stackLimit?: Record<string, unknown>
  }[]
}

// 参数接口
export interface ListPreviewQuestionByPageParams {
  /* */
  current?: number

  /* */
  pageSize?: number

  /* */
  id?: number

  /* */
  title?: string

  /* */
  content?: string

  /* */
  tag?: Record<string, unknown>[]

  /* */
  uploader?: number
}

// 响应接口
export interface ListPreviewQuestionByPageRes {
  /* */
  code: number

  /* */
  data: {
    /* */
    records: {
      /* */
      id: number

      /* */
      title: string

      /*可用值:EASY,MEDIUM,HARD */
      difficulty: string

      /* */
      tag: Record<string, unknown>[]
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
export interface DoQuestionSubmitParams {
  /*可用值:JAVA,PYTHON,C,C_PLUS_PLUS,C_SHARP,GO,JAVASCRIPT,PHP,RUBY,RUST,SWIFT */
  language: string

  /* */
  judgeCode: string

  /* */
  questionId: number
}

// 响应接口
export interface DoQuestionSubmitRes {
  /* */
  code: number

  /* */
  data: number

  /* */
  message: string
}

// 参数接口
export interface ListQuestionSubmitParams {
  /* */
  current?: number

  /* */
  pageSize?: number

  /*可用值:JAVA */
  language?: string

  /*可用值:WAITING,RUNNING,SUCCEED,FAILED */
  status?: string

  /* */
  questionId: number
}

// 响应接口
export interface ListQuestionSubmitRes {
  /* */
  code: number

  /* */
  data: {
    /* */
    id: number

    /*可用值:JAVA */
    language: string

    /* */
    judgeCode: string

    /* */
    judgeInfo: {
      /*可用值:ACCEPTED,WRONG_ANSWER,COMPILE_ERROR,MEMORY_LIMIT_EXCEEDED,TIME_LIMIT_EXCEEDED,PRESENTATION_ERROR,WAITING,OUTPUT_LIMIT_EXCEEDED,DANGEROUS_OPERATION,RUNTIME_ERROR,SYSTEM_ERROR */
      message: string

      /* */
      memory: number

      /* */
      time: number
    }

    /*可用值:WAITING,RUNNING,SUCCEED,FAILED */
    status: string

    /* */
    questionId: number

    /* */
    userId: number

    /* */
    createTime: Record<string, unknown>
  }[]

  /* */
  message: string
}
