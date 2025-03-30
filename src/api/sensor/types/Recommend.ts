// 参数接口
export interface AiRecommendParams {
    /*用户需求描述 */
    requirement?: string;

    /*1-激光传感器，2-视觉传感器 */
    sensorType?: number;

    /*应用场景 */
    scenario?: string;

    /*预算范围 */
    budget?: string;

    /*其他要求 */
    otherRequirements?: string;
}

// 响应接口
export interface AiRecommendRes {
    /* */
    code: number;

    /* */
    data: {
        /*id */
        id: number;

        /*推荐需求 */
        reason: string;

        /*生成的推荐结论 */
        genResult: string;

        /*使用推荐系统的用户id */
        userId: number;

        /*创建时间 */
        createTime: Record<string, unknown>;

        /*更新时间 */
        updateTime: Record<string, unknown>;
    };

    /* */
    message: string;
}
// 参数接口
export interface PageRecommendParams {
    /* */
    current?: number;

    /* */
    pageSize?: number;
}

// 响应接口
export interface PageRecommendRes {
    /* */
    code: number;

    /* */
    data: {
        /* */
        records: {
            /*id */
            id: number;

            /*推荐需求 */
            reason: string;

            /*生成的推荐结论 */
            genResult: string;

            /*使用推荐系统的用户id */
            userId: number;

            /*创建时间 */
            createTime: Record<string, unknown>;

            /*更新时间 */
            updateTime: Record<string, unknown>;
        }[];

        /* */
        pageNumber: number;

        /* */
        pageSize: number;

        /* */
        totalPage: number;

        /* */
        totalRow: number;

        /* */
        optimizeCountQuery: boolean;
    };

    /* */
    message: string;
}