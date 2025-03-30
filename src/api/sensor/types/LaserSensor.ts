// 参数接口
export interface UpdateLaserParams {
    /* */
    id: number;

    /*品牌ID */
    brandId?: number;

    /*型号（如MB2D63R） */
    model?: string;

    /*最小测量范围（单位：m） */
    measurementMin?: number;

    /*最大测量范围（单位：m） */
    measurementMax?: number;

    /*测距精度（如±0.02%存储为0.02） */
    accuracy?: number;

    /*扫描频率（单位：Hz） */
    scanFrequency?: number;

    /*最小波长（单位：nm） */
    wavelengthMin?: number;

    /*最大波长（单位：nm） */
    wavelengthMax?: number;

    /*分辨率（如0.1μm存储为0.0001） */
    resolution?: number;

    /*最低工作温度（℃） */
    temperatureMin?: number;

    /*最高工作温度（℃） */
    temperatureMax?: number;

    /*防护等级（如IP67） */
    ipRating?: string;

    /*通信接口（如EtherCAT,RS-485） */
    interfaces?: string;

    /*数据输出格式（点云/深度图） */
    dataFormat?: string;

    /*适用场景（如AGV导航、焊接检测） */
    applicationScenarios?: string;

    /*参考价格（单位：元） */
    price?: number;

    /*供应商信息 */
    supplier?: string;
}

// 响应接口
export interface UpdateLaserRes {
    /* */
    code: number;

    /* */
    data: boolean;

    /* */
    message: string;
}

// 参数接口
export interface SaveLaserParams {
    /*品牌ID */
    brandId: number;

    /*型号（如MB2D63R） */
    model: string;

    /*最小测量范围（单位：m） */
    measurementMin?: number;

    /*最大测量范围（单位：m） */
    measurementMax?: number;

    /*测距精度（如±0.02%存储为0.02） */
    accuracy?: number;

    /*扫描频率（单位：Hz） */
    scanFrequency?: number;

    /*最小波长（单位：nm） */
    wavelengthMin?: number;

    /*最大波长（单位：nm） */
    wavelengthMax?: number;

    /*分辨率（如0.1μm存储为0.0001） */
    resolution?: number;

    /*最低工作温度（℃） */
    temperatureMin?: number;

    /*最高工作温度（℃） */
    temperatureMax?: number;

    /*防护等级（如IP67） */
    ipRating?: string;

    /*通信接口（如EtherCAT,RS-485） */
    interfaces?: string;

    /*数据输出格式（点云/深度图） */
    dataFormat?: string;

    /*适用场景（如AGV导航、焊接检测） */
    applicationScenarios?: string;

    /*参考价格（单位：元） */
    price?: number;

    /*供应商信息 */
    supplier?: string;
}

// 响应接口
export interface SaveLaserRes {
    /* */
    code: number;

    /* */
    data: boolean;

    /* */
    message: string;
}

// 参数接口
export interface PageLaserParams {
    /* */
    current?: number;

    /* */
    pageSize?: number;
}

// 响应接口
export interface PageLaserRes {
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

            /*型号（如MB2D63R） */
            model: string;

            /*最小测量范围（单位：m） */
            measurementMin: number;

            /*最大测量范围（单位：m） */
            measurementMax: number;

            /*测距精度（如±0.02%存储为0.02） */
            accuracy: number;

            /*扫描频率（单位：Hz） */
            scanFrequency: number;

            /*最小波长（单位：nm） */
            wavelengthMin: number;

            /*最大波长（单位：nm） */
            wavelengthMax: number;

            /*分辨率（如0.1μm存储为0.0001） */
            resolution: number;

            /*最低工作温度（℃） */
            temperatureMin: number;

            /*最高工作温度（℃） */
            temperatureMax: number;

            /*防护等级（如IP67） */
            ipRating: string;

            /*通信接口（如EtherCAT,RS-485） */
            interfaces: string;

            /*数据输出格式（点云/深度图） */
            dataFormat: string;

            /*适用场景（如AGV导航、焊接检测） */
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
export interface FilterLaserParams {
    /* */
    current?: number;

    /* */
    pageSize?: number;

    /*品牌ID */
    brandId?: number;

    /*型号（如MB2D63R） */
    model?: string;

    /*最小测量范围下限（单位：m） */
    measurementMinLower?: number;

    /*最小测量范围上限（单位：m） */
    measurementMinUpper?: number;

    /*最大测量范围下限（单位：m） */
    measurementMaxLower?: number;

    /*最大测量范围上限（单位：m） */
    measurementMaxUpper?: number;

    /*测距精度上限（如±0.02%存储为0.02） */
    accuracyUpper?: number;

    /*扫描频率下限（单位：Hz） */
    scanFrequencyLower?: number;

    /*波长范围下限（单位：nm） */
    wavelengthMinLower?: number;

    /*波长范围上限（单位：nm） */
    wavelengthMaxUpper?: number;

    /*分辨率上限（如0.1μm存储为0.0001） */
    resolutionUpper?: number;

    /*工作温度范围下限（℃） */
    temperatureMinLower?: number;

    /*工作温度范围上限（℃） */
    temperatureMaxUpper?: number;

    /*防护等级（如IP67） */
    ipRating?: string;

    /*通信接口（如EtherCAT,RS-485） */
    interfaces?: string;

    /*数据输出格式（点云/深度图） */
    dataFormat?: string;

    /*适用场景（如AGV导航、焊接检测） */
    applicationScenarios?: string;

    /*参考价格下限（单位：元） */
    priceLower?: number;

    /*参考价格上限（单位：元） */
    priceUpper?: number;

    /*供应商信息 */
    supplier?: string;
}

// 响应接口
export interface FilterLaserRes {
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

            /*型号（如MB2D63R） */
            model: string;

            /*最小测量范围（单位：m） */
            measurementMin: number;

            /*最大测量范围（单位：m） */
            measurementMax: number;

            /*测距精度（如±0.02%存储为0.02） */
            accuracy: number;

            /*扫描频率（单位：Hz） */
            scanFrequency: number;

            /*最小波长（单位：nm） */
            wavelengthMin: number;

            /*最大波长（单位：nm） */
            wavelengthMax: number;

            /*分辨率（如0.1μm存储为0.0001） */
            resolution: number;

            /*最低工作温度（℃） */
            temperatureMin: number;

            /*最高工作温度（℃） */
            temperatureMax: number;

            /*防护等级（如IP67） */
            ipRating: string;

            /*通信接口（如EtherCAT,RS-485） */
            interfaces: string;

            /*数据输出格式（点云/深度图） */
            dataFormat: string;

            /*适用场景（如AGV导航、焊接检测） */
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
export interface GetInfoLaserRes {
    /* */
    code: number;

    /* */
    data: {
        /* */
        id: number;

        /*品牌ID */
        brandId: number;

        /*型号（如MB2D63R） */
        model: string;

        /*最小测量范围（单位：m） */
        measurementMin: number;

        /*最大测量范围（单位：m） */
        measurementMax: number;

        /*测距精度（如±0.02%存储为0.02） */
        accuracy: number;

        /*扫描频率（单位：Hz） */
        scanFrequency: number;

        /*最小波长（单位：nm） */
        wavelengthMin: number;

        /*最大波长（单位：nm） */
        wavelengthMax: number;

        /*分辨率（如0.1μm存储为0.0001） */
        resolution: number;

        /*最低工作温度（℃） */
        temperatureMin: number;

        /*最高工作温度（℃） */
        temperatureMax: number;

        /*防护等级（如IP67） */
        ipRating: string;

        /*通信接口（如EtherCAT,RS-485） */
        interfaces: string;

        /*数据输出格式（点云/深度图） */
        dataFormat: string;

        /*适用场景（如AGV导航、焊接检测） */
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
export interface RemoveLaserRes {
    /* */
    code: number;

    /* */
    data: boolean;

    /* */
    message: string;
}
