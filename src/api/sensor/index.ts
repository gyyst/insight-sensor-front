import { request } from "@/utils/service"
import type * as VisionSensor from "./types/VisionSensor"
import type * as LaserSensor from "./types/LaserSensor"
import type * as SensorBrand from "./types/SensorBrand"
import type * as Recommend from "./types/Recommend"

/** 更新视觉传感器 */
export function updateVisionApi(data: VisionSensor.UpdateVisionParams) {
    return request<VisionSensor.UpdateVisionRes>({
        url: "/sensor/visionSensors/update",
        method: "put",
        data
    })
}

/** 保存视觉传感器 */
export function saveVisionApi(data: VisionSensor.SaveVisionParams) {
    return request<VisionSensor.SaveVisionRes>({
        url: "/sensor/visionSensors/save",
        method: "post",
        data
    })
}

/** 分页查询视觉传感器 */
export function pageVisionApi(params: VisionSensor.PageVisionParams) {
    return request<VisionSensor.PageVisionRes>({
        url: "/sensor/visionSensors/page",
        method: "post",
        params
    })
}

/** 条件筛选视觉传感器 */
export function filterVisionApi(params: VisionSensor.FilterVisionParams) {
    return request<VisionSensor.FilterVisionRes>({
        url: "/sensor/visionSensors/filter",
        method: "post",
        params
    })
}

/** 获取视觉传感器详情 */
export function getInfoVisionApi(id: number) {
    return request<VisionSensor.GetInfoVisionRes>({
        url: "/sensor/visionSensors/getInfo/" + id,
        method: "get"
    })
}

/** 删除视觉传感器 */
export function removeVisionApi(id: number) {
    return request<VisionSensor.RemoveVisionRes>({
        url: "/sensor/visionSensors/remove/" + id,
        method: "delete"
    })
}

/** 更新激光传感器 */
export function updateLaserApi(data: LaserSensor.UpdateLaserParams) {
    return request<LaserSensor.UpdateLaserRes>({
        url: "/sensor/laserSensors/update",
        method: "put",
        data
    })
}

/** 保存激光传感器 */
export function saveLaserApi(data: LaserSensor.SaveLaserParams) {
    return request<LaserSensor.SaveLaserRes>({
        url: "/sensor/laserSensors/save",
        method: "post",
        data
    })
}

/** 分页查询激光传感器 */
export function pageLaserApi(params: LaserSensor.PageLaserParams) {
    return request<LaserSensor.PageLaserRes>({
        url: "/sensor/laserSensors/page",
        method: "post",
        params
    })
}

/** 条件筛选激光传感器 */
export function filterLaserApi(params: LaserSensor.FilterLaserParams) {
    return request<LaserSensor.FilterLaserRes>({
        url: "/sensor/laserSensors/filter",
        method: "post",
        params
    })
}

/** 获取激光传感器详情 */
export function getInfoLaserApi(id: number) {
    return request<LaserSensor.GetInfoLaserRes>({
        url: "/sensor/laserSensors/getInfo/" + id,
        method: "get"
    })
}

/** 删除激光传感器 */
export function removeLaserApi(id: number) {
    return request<LaserSensor.RemoveLaserRes>({
        url: "/sensor/laserSensors/remove/" + id,
        method: "delete"
    })
}

/** 更新传感器品牌 */
export function updateBrandApi(data: SensorBrand.UpdateBrandParams) {
    return request<SensorBrand.UpdateBrandRes>({
        url: "/sensor/sensorBrands/update",
        method: "put",
        data
    })
}

/** 保存传感器品牌 */
export function saveBrandApi(data: SensorBrand.SaveBrandParams) {
    return request<SensorBrand.SaveBrandRes>({
        url: "/sensor/sensorBrands/save",
        method: "post",
        data
    })
}

/** 分页查询传感器品牌 */
export function pageBrandApi(params: SensorBrand.PageBrandParams) {
    return request<SensorBrand.PageBrandRes>({
        url: "/sensor/sensorBrands/page",
        method: "post",
        params
    })
}

/** 获取传感器品牌详情 */
export function getInfoBrandApi(id: number) {
    return request<SensorBrand.GetInfoBrandRes>({
        url: "/sensor/sensorBrands/getInfo/" + id,
        method: "get"
    })
}

/** 删除传感器品牌 */
export function removeBrandApi(id: number) {
    return request<SensorBrand.RemoveBrandRes>({
        url: "/sensor/sensorBrands/remove/" + id,
        method: "delete"
    })
}

/** AI推荐传感器 */
export function aiRecommendApi(data: Recommend.AiRecommendParams) {
    return request<Recommend.AiRecommendRes>({
        url: "/sensor/recommendResult/recommend",
        method: "post",
        data
    })
}

/** 分页查询推荐记录 */
export function pageRecommendApi(params: Recommend.PageRecommendParams) {
    return request<Recommend.PageRecommendRes>({
        url: "/sensor/recommendResult/page",
        method: "get",
        params
    })
}

