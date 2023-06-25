import request from '../core'
import { GetPaginationResult, ResponseType } from '../core/type'
import { QuestionResult, WaitResult } from './questionService.type'

export default class QuestionService {
  questionUrl: string

  constructor() {
    this.questionUrl = '/app/question'
  }
  // 질문 검색
  async getQuestionDetail(questionId: number) {
    const data: ResponseType<QuestionResult> = await request.get(
      `${this.questionUrl}/${questionId}`,
    )

    return data.result
  }

  // 이 중에 뭐 살까 투표
  async voteItem(questionId: number, voteSortOrder: number) {
    const data: ResponseType = await request.post(`${this.questionUrl}/${questionId}/vote`, {
      voteSortOrder,
    })
    return data
  }

  // 추천해 줘 기다리는 추천
  async getWaitQusestion(questionId: number, qType: string) {
    const data: ResponseType<Array<WaitResult>> = await request.get(`${this.questionUrl}/wait`, {
      params: { questionId: questionId, qType: qType },
    })
    return data.result
  }
}
