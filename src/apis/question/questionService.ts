import request from '../core'
import { GetPaginationResult, ResponseType } from '../core/type'
import { QuestionResult } from './questionService.type'

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
}
