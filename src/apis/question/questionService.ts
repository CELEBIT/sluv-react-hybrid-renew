import { CommunityItem } from '../../recoil/communityInfo'
import request from '../core'
import { GetPaginationResult, ResponseType } from '../core/type'
import { QuestionResult, WaitResult } from './questionService.type'

export interface questionUpload {
  id: number
}

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

  // 찾아주세요 게시글 등록
  async postFindRequest(item: CommunityItem) {
    const data: ResponseType<questionUpload> = await request.post(`${this.questionUrl}/find`, item)
    return data.result
  }

  // 이 중에 뭐 살까 게시글 등록
  async postBuyRequest(item: CommunityItem) {
    const data: ResponseType<questionUpload> = await request.post(`${this.questionUrl}/buy`, item)
    return data.result
  }

  // 이거 어때 게시글 등록
  async postHowAboutRequest(item: CommunityItem) {
    const data: ResponseType<questionUpload> = await request.post(
      `${this.questionUrl}/how-about`,
      item,
    )
    return data.result
  }

  // 추천해줘 게시글 등록
  async postRecommendRequest(item: CommunityItem) {
    const data: ResponseType<questionUpload> = await request.post(
      `${this.questionUrl}/recommend`,
      item,
    )
    return data.result
  }

  // 커뮤니티 아이템 검색(qtype으로 구별)
  async getQuestionList(page: number, qType?: string | undefined) {
    const data: ResponseType<GetPaginationResult<WaitResult>> = await request.get(
      `${this.questionUrl}/list`,
      {
        params: {
          page,
          qType,
          size: 20,
        },
      },
    )
    return data.result
  }
}
