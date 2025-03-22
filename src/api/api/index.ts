import { request } from "@/utils/service";
import type * as Api from "@/api/api/types/api";
//
// /** 增 */
// export function createChartAPI(data: Chart.CreateChartRequest) {
//   return request({
//     url: "/bi/chart/add",
//     method: "post",
//     data
//   })
// }
//
// /** 删 */
// export function deleteChartAPI(data: Chart.DeleteChartRequest) {
//   return request({
//     url: "/bi/chart/delete",
//     method: "post",
//     data
//   })
// }
//
// /** 改 */
// export function updateChartAPI(data: Chart.UpdateChartRequest) {
//   return request({
//     url: "/bi/chart/update",
//     method: "post",
//     data
//   })
// }
//
/** 查 */
export function searchApiInfo(data: Api.SearchApiInfoParams): Promise<Api.SearchApiInfoRes> {
  return request({
    url: "/api/apiInfo/page",
    method: "post",
    data
  })
}

export function getApiInfo(apiId: string) {
  return request({
    url: "/api/apiInfo/" + apiId,
    method: "get"
  })
}

export function invokeOnlineApi(data: Api.InvokeOnlineApiParams) {
  return request({
    url: "/api/userApiInvoke/online",
    method: "post",
    data
  })
}

export function addApi(data: Api.AddApiInfoParams) {
  return request({
    url: "/api/apiInfo/save",
    method: "post",
    data
  })
}

// export function genChartByAiAPI(data: Analysis.AnalysisRes) {
//   return request({
//     url: "/bi/chart/gen",
//     method: "post",
//     data,
//     headers: { "Content-Type": "multipart/form-data" },
//     timeout: 100000
//   })
// }
//
// export function genChartByAiAsyncAPI(data: Analysis.AnalysisRes) {
//   return request({
//     url: "/bi/chart/gen/async",
//     method: "post",
//     data,
//     headers: { "Content-Type": "multipart/form-data" },
//     timeout: 100000
//   })
// }
