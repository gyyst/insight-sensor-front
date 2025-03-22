import * as Question from "@/api/oj/types/questionInfo"
import { DoQuestionSubmitRes, ListQuestionByPageRes, ListQuestionSubmitRes } from "@/api/oj/types/questionInfo"
import { request } from "@/utils/service"
import { LocationQueryValue } from "vue-router"

export function addQuestionAPI(data: Question.AddQuestionParams) {
  return request({
    url: "/oj/questionInfo/add",
    method: "post",
    data
  })
}

/**
 * listQuestionByPage
 * @param {number} data.current
 * @param {number} data.pageSize
 * @param {number} data.id
 * @param {string} data.title
 * @param {string} data.content
 * @param {array} data.tag
 * @param {number} data.uploader
 * @returns
 * @param data
 */
export function listQuestionByPage(data: Question.ListQuestionByPageParams): Promise<ListQuestionByPageRes> {
  return request({
    url: `/oj/questionInfo/list/page`,
    method: "post",
    data
  })
}

/**
 * deleteQuestion
 * @param {object} data DeleteRequest
 * @param {number} data.id
 * @returns
 */
// @ts-ignore
export function deleteQuestion(data: Question.DeleteQuestionParams) {
  return request({
    url: `/oj/questionInfo/delete`,
    method: "post",
    data
  })
}

/**
 * getQuestionById
 * @param {number} data.id
 * @returns
 */
export function getQuestionById(data: string | LocationQueryValue[]) {
  return request({
    url: `/oj/questionInfo/get`,
    method: "get",
    params: { id: data }
  })
}

/**
 * updateQuestion
 * @param {object} data QuestionUpdateRequest
 * @param {number} data.id
 * @param {string} data.title
 * @param {string} data.content
 * @param {string} data.difficulty 可用值:EASY,MEDIUM,HARD
 * @param {array} data.tag
 * @param {string} data.answer
 * @param {array} data.judgeCase
 * @param {array} data.judgeConfig
 * @returns
 */
export function updateQuestion(data: Question.UpdateQuestionParams) {
  return request({
    url: `/oj/questionInfo/update`,
    method: "post",
    data
  })
}

/**
 * listPreviewQuestionByPage
 * @param {number} params.current
 * @param {number} params.pageSize
 * @param {number} params.id
 * @param {string} params.title
 * @param {string} params.content
 * @param {array} params.tag
 * @param {number} params.uploader
 * @returns
 * @param data
 */
export function listPreviewQuestionByPage(data: Question.ListPreviewQuestionByPageParams) {
  return request({
    url: `/oj/questionInfo/list/page/vo`,
    method: "post",
    data
  })
}

/**
 * doQuestionSubmit
 * @param {string} data.language 可用值:JAVA,PYTHON,C,C_PLUS_PLUS,C_SHARP,GO,JAVASCRIPT,PHP,RUBY,RUST,SWIFT
 * @param {string} data.judgeCode
 * @param {number} data.questionId
 * @returns
 * @param data
 */
export function doQuestionSubmit(data: Question.DoQuestionSubmitParams): Promise<DoQuestionSubmitRes> {
  return request({
    url: `/oj/questionInfo/questionSubmit/do`,
    method: "post",
    data
  })
}

/**
 * listQuestionSubmit
 * @param {number} data.current
 * @param {number} data.pageSize
 * @param {string} data.language 可用值:JAVA
 * @param {string} data.status 可用值:WAITING,RUNNING,SUCCEED,FAILED
 * @param {number} data.questionId
 * @returns
 * @param data
 */
export function listQuestionSubmit(data: Question.ListQuestionSubmitParams): Promise<ListQuestionSubmitRes> {
  return request({
    url: `/oj/questionInfo/questionSubmit/list`,
    method: "post",
    data
  })
}
