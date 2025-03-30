// 参数接口
export interface UpdateVisionParams {
    /* */
    id: number;

    /*品牌ID */
    brandId?: number;

    /*型号（如LXPS-DS4423-M-79） */
    model?: string;

    /*水平分辨率（像素） */
    resolutionWidth?: number;

    /*垂直分辨率（像素） */
    resolutionHeight?: number;

    /*帧率（fps） */
    frameRate?: number;

    /*水平视场角（°） */
    fovHorizontal?: number;

    /*垂直视场角（°） */
    fovVertical?: number;

    /*深度精度（如±0.1mm存储为0.1） */
    depthAccuracy?: number;

    /*支持的算法库（如OpenCV,YOLO） */
    algorithmSupport?: string;

    /*最低工作温度（℃） */
    temperatureMin?: number;

    /*最高工作温度（℃） */
    temperatureMax?: number;

    /*防护等级（如IP65） */
    ipRating?: string;

    /*接口类型（如USB3.0,GigE） */
    interfaces?: string;

    /*数据格式（RGB/深度图） */
    dataFormat?: string;

    /*适用场景（如分拣、SLAM） */
    applicationScenarios?: string;

    /*参考价格（单位：元） */
    price?: number;

    /*供应商信息 */
    supplier?: string;
}

// 响应接口
export interface UpdateVisionRes {
    /* */
    code: number;

    /* */
    data: boolean;

    /* */
    message: string;
}

// 参数接口
export interface SaveVisionParams {
    /*品牌ID */
    brandId: number;

    /*型号（如LXPS-DS4423-M-79） */
    model: string;

    /*水平分辨率（像素） */
    resolutionWidth?: number;

    /*垂直分辨率（像素） */
    resolutionHeight?: number;

    /*帧率（fps） */
    frameRate?: number;

    /*水平视场角（°） */
    fovHorizontal?: number;

    /*垂直视场角（°） */
    fovVertical?: number;

    /*深度精度（如±0.1mm存储为0.1） */
    depthAccuracy?: number;

    /*支持的算法库（如OpenCV,YOLO） */
    algorithmSupport?: string;

    /*最低工作温度（℃） */
    temperatureMin?: number;

    /*最高工作温度（℃） */
    temperatureMax?: number;

    /*防护等级（如IP65） */
    ipRating?: string;

    /*接口类型（如USB3.0,GigE） */
    interfaces?: string;

    /*数据格式（RGB/深度图） */
    dataFormat?: string;

    /*适用场景（如分拣、SLAM） */
    applicationScenarios?: string;

    /*参考价格（单位：元） */
    price?: number;

    /*供应商信息 */
    supplier?: string;
}

// 响应接口
export interface SaveVisionRes {
    /* */
    code: number;

    /* */
    data: boolean;

    /* */
    message: string;
}

// 参数接口
export interface PageVisionParams {
    /* */
    current?: number;

    /* */
    pageSize?: number;
}

// 响应接口
export interface PageVisionRes {
    /* */
    code: number;

    /* */
    data: {
        /* */
        records: {
            /* */
            id: number;

            /*品牌ID */
            brandId: number;

            /*型号（如LXPS-DS4423-M-79） */
            model: string;

            /*水平分辨率（像素） */
            resolutionWidth: number;

            /*垂直分辨率（像素） */
            resolutionHeight: number;

            /*帧率（fps） */
            frameRate: number;

            /*水平视场角（°） */
            fovHorizontal: number;

            /*垂直视场角（°） */
            fovVertical: number;

            /*深度精度（如±0.1mm存储为0.1） */
            depthAccuracy: number;

            /*支持的算法库（如OpenCV,YOLO） */
            algorithmSupport: string;

            /*最低工作温度（℃） */
            temperatureMin: number;

            /*最高工作温度（℃） */
            temperatureMax: number;

            /*防护等级（如IP65） */
            ipRating: string;

            /*接口类型（如USB3.0,GigE） */
            interfaces: string;

            /*数据格式（RGB/深度图） */
            dataFormat: string;

            /*适用场景（如分拣、SLAM） */
            applicationScenarios: string;

            /*参考价格（单位：元） */
            price: number;

            /*供应商信息 */
            supplier: string;

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
// 参数接口
export interface FilterVisionParams {
    /* */
    current?: number;

    /* */
    pageSize?: number;

    /*品牌ID */
    brandId?: number;

    /*型号（如LXPS-DS4423-M-79） */
    model?: string;

    /*水平分辨率下限（像素） */
    resolutionWidthLower?: number;

    /*水平分辨率上限（像素） */
    resolutionWidthUpper?: number;

    /*垂直分辨率下限（像素） */
    resolutionHeightLower?: number;

    /*垂直分辨率上限（像素） */
    resolutionHeightUpper?: number;

    /*帧率下限（fps） */
    frameRateLower?: number;

    /*水平视场角下限（°） */
    fovHorizontalLower?: number;

    /*垂直视场角下限（°） */
    fovVerticalLower?: number;

    /*深度精度上限（如±0.1mm存储为0.1） */
    depthAccuracyUpper?: number;

    /*支持的算法库（如OpenCV,YOLO） */
    algorithmSupport?: string;

    /*工作温度范围下限（℃） */
    temperatureMinLower?: number;

    /*工作温度范围上限（℃） */
    temperatureMaxUpper?: number;

    /*防护等级（如IP65） */
    ipRating?: string;

    /*接口类型（如USB3.0,GigE） */
    interfaces?: string;

    /*数据格式（RGB/深度图） */
    dataFormat?: string;

    /*适用场景（如分拣、SLAM） */
    applicationScenarios?: string;

    /*参考价格下限（单位：元） */
    priceLower?: number;

    /*参考价格上限（单位：元） */
    priceUpper?: number;

    /*供应商信息 */
    supplier?: string;
}

// 响应接口
export interface FilterVisionRes {
    /* */
    code: number;

    /* */
    data: {
        /* */
        records: {
            /* */
            id: number;

            /*品牌ID */
            brandId: number;

            /*型号（如LXPS-DS4423-M-79） */
            model: string;

            /*水平分辨率（像素） */
            resolutionWidth: number;

            /*垂直分辨率（像素） */
            resolutionHeight: number;

            /*帧率（fps） */
            frameRate: number;

            /*水平视场角（°） */
            fovHorizontal: number;

            /*垂直视场角（°） */
            fovVertical: number;

            /*深度精度（如±0.1mm存储为0.1） */
            depthAccuracy: number;

            /*支持的算法库（如OpenCV,YOLO） */
            algorithmSupport: string;

            /*最低工作温度（℃） */
            temperatureMin: number;

            /*最高工作温度（℃） */
            temperatureMax: number;

            /*防护等级（如IP65） */
            ipRating: string;

            /*接口类型（如USB3.0,GigE） */
            interfaces: string;

            /*数据格式（RGB/深度图） */
            dataFormat: string;

            /*适用场景（如分拣、SLAM） */
            applicationScenarios: string;

            /*参考价格（单位：元） */
            price: number;

            /*供应商信息 */
            supplier: string;

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
export interface GetInfoVisionRes {
    /* */
    code: number;

    /* */
    data: {
        /* */
        id: number;

        /*品牌ID */
        brandId: number;

        /*型号（如LXPS-DS4423-M-79） */
        model: string;

        /*水平分辨率（像素） */
        resolutionWidth: number;

        /*垂直分辨率（像素） */
        resolutionHeight: number;

        /*帧率（fps） */
        frameRate: number;

        /*水平视场角（°） */
        fovHorizontal: number;

        /*垂直视场角（°） */
        fovVertical: number;

        /*深度精度（如±0.1mm存储为0.1） */
        depthAccuracy: number;

        /*支持的算法库（如OpenCV,YOLO） */
        algorithmSupport: string;

        /*最低工作温度（℃） */
        temperatureMin: number;

        /*最高工作温度（℃） */
        temperatureMax: number;

        /*防护等级（如IP65） */
        ipRating: string;

        /*接口类型（如USB3.0,GigE） */
        interfaces: string;

        /*数据格式（RGB/深度图） */
        dataFormat: string;

        /*适用场景（如分拣、SLAM） */
        applicationScenarios: string;

        /*参考价格（单位：元） */
        price: number;

        /*供应商信息 */
        supplier: string;

        /*创建时间 */
        createTime: Record<string, unknown>;

        /*更新时间 */
        updateTime: Record<string, unknown>;
    };

    /* */
    message: string;
}
// 响应接口
export interface RemoveVisionRes {
    /* */
    code: number;

    /* */
    data: boolean;

    /* */
    message: string;
}
