// 参数接口
export interface UpdateBrandParams {
    /* */
    id: number;

    /*品牌名称 */
    brandName?: string;

    /*品牌描述 */
    description?: string;

    /*品牌所属国家 */
    country?: string;

    /*品牌官网 */
    website?: string;
}

// 响应接口
export interface UpdateBrandRes {
    /* */
    code: number;

    /* */
    data: boolean;

    /* */
    message: string;
}
// 参数接口
export interface SaveBrandParams {
    /*品牌名称 */
    brandName: string;

    /*品牌描述 */
    description?: string;

    /*品牌所属国家 */
    country?: string;

    /*品牌官网 */
    website?: string;
}

// 响应接口
export interface SaveBrandRes {
    /* */
    code: number;

    /* */
    data: boolean;

    /* */
    message: string;
}
// 参数接口
export interface PageBrandParams {
    /* */
    current?: number;

    /* */
    pageSize?: number;
}

// 响应接口
export interface PageBrandRes {
    /* */
    code: number;

    /* */
    data: {
        /* */
        records: {
            /* */
            id: number;

            /*品牌名称 */
            brandName: string;

            /*品牌描述 */
            description: string;

            /*品牌所属国家 */
            country: string;

            /*品牌官网 */
            website: string;

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
// 响应接口
export interface GetInfoBrandRes {
    /* */
    code: number;

    /* */
    data: {
        /* */
        id: number;

        /*品牌名称 */
        brandName: string;

        /*品牌描述 */
        description: string;

        /*品牌所属国家 */
        country: string;

        /*品牌官网 */
        website: string;

        /*创建时间 */
        createTime: Record<string, unknown>;

        /*更新时间 */
        updateTime: Record<string, unknown>;
    };

    /* */
    message: string;
}
// 响应接口
export interface RemoveBrandRes {
    /* */
    code: number;

    /* */
    data: boolean;

    /* */
    message: string;
}