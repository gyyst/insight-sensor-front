import { request } from "@/utils/service"
import type * as Chart from "./types/chart"
import type * as Analysis from "./types/analysis"

/** 增 */
export function createChartAPI(data: Chart.CreateChartRequest) {
  return request({
    url: "/bi/chart/add",
    method: "post",
    data
  })
}

/** 删 */
export function deleteChartAPI(data: Chart.DeleteChartRequest) {
  return request({
    url: "/bi/chart/delete",
    method: "post",
    data
  })
}

/** 改 */
export function updateChartAPI(data: Chart.UpdateChartRequest) {
  return request({
    url: "/bi/chart/update",
    method: "post",
    data
  })
}

/** 查 */
export function getChartDataAPI(data: Chart.GetChartDataRequest) {
  return request({
    url: "/bi/chart/list/page",
    method: "post",
    data
  })
}

export function genChartByAiAPI(data: Analysis.AnalysisRes) {
  return request({
    url: "/bi/chart/gen",
    method: "post",
    data,
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 100000
  })
}

export function genChartByAiAsyncAPI(data: Analysis.AnalysisRes) {
  return request({
    url: "/bi/chart/gen/async",
    method: "post",
    data,
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 100000
  })
}
