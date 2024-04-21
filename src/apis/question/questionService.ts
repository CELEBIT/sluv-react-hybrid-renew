import { CommunityItem } from '../../recoil/communityInfo'
import request from '../core'
import { GetPaginationResult, ResponseType } from '../core/type'
import { CommunityBannerItem, QuestionResult } from './questionService.type'
import { BuyHomeResult, SearchQuestionResult } from '../search/searchService'

export interface questionUpload {
  id: number
}

export default class QuestionService {
  questionUrl: string
  commentUrl: string

  constructor() {
    this.questionUrl = '/app/question'
    this.commentUrl = '/app/comment'
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
    const data: ResponseType<Array<SearchQuestionResult>> = await request.get(
      `${this.questionUrl}/wait`,
      {
        params: { questionId: questionId, qType: qType },
      },
    )
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

  // 아이템 좋아요
  async likeQusetion(questionId: number | null) {
    const data: ResponseType = await request.post(`${this.questionUrl}/${questionId}/like`)
    return data
  }

  // 커뮤니티 전체 아이템 검색
  async getQuestionTotalList(page: number) {
    const data: ResponseType<GetPaginationResult<SearchQuestionResult>> = await request.get(
      `${this.questionUrl}/total`,
      {
        params: {
          page,
          size: 20,
        },
      },
    )
    return data.result
  }

  // 커뮤니티 주간 HOT 아이템 검색
  async getQuestionHotList(page: number) {
    const data: ResponseType<GetPaginationResult<SearchQuestionResult>> = await request.get(
      `${this.questionUrl}/weeklyhot`,
      {
        params: {
          page,
          size: 20,
        },
      },
    )
    return data.result
  }

  // 커뮤니티 게시글 신고
  async reportQuestion(questionId: number, reason: string, content: string) {
    const data: ResponseType = await request.post(`${this.questionUrl}/${questionId}/report`, {
      reason,
      content,
    })
    return data
  }

  // 커뮤니티 댓글 신고
  async reportComment(commentId: number, reason: string, content: string) {
    const data: ResponseType = await request.post(`${this.commentUrl}/${commentId}/report`, {
      reason,
      content,
    })
    return data
  }

  // 질문 게시글 삭제
  async deleteQuestion(questionId: number) {
    const data: ResponseType = await request.delete(`${this.questionUrl}/${questionId}`)
    // console.log('질문게시글삭제', data)
    return data
  }

  // 커뮤니티 홈 배너 아이템
  async getCommunityBannerItems() {
    const data: ResponseType<Array<CommunityBannerItem>> = await request.get(
      `${this.questionUrl}/dailyhot`,
    )
    return data.result
  }

  // 찾아주세요 홈 아이템 검색
  async getQuestionFindList(page: number, celebId?: number) {
    const data: ResponseType<GetPaginationResult<SearchQuestionResult>> = await request.get(
      `${this.questionUrl}/find`,
      {
        params: {
          celebId: celebId,
          page,
          size: 20,
        },
      },
    )
    return data.result
  }
  // 이 중에 뭐 살까 홈 아이템 검색
  async getQuestionBuyList(page: number, voteStatus?: string) {
    const data: ResponseType<GetPaginationResult<BuyHomeResult>> = await request.get(
      `${this.questionUrl}/buy`,
      {
        params: {
          voteStatus: voteStatus,
          page,
          size: 20,
        },
      },
    )
    return data.result
  }
  // 이거 어때 홈 아이템 검색
  async getQuestionHowAboutList(page: number, celebId?: number) {
    const data: ResponseType<GetPaginationResult<SearchQuestionResult>> = await request.get(
      `${this.questionUrl}/howabout`,
      {
        params: {
          celebId: celebId,
          page,
          size: 20,
        },
      },
    )
    return data.result
  }
  // 추천해줘 홈 아이템 검색
  async getQuestionRecommendList(page: number, hashtag?: string) {
    const data: ResponseType<GetPaginationResult<SearchQuestionResult>> = await request.get(
      `${this.questionUrl}/recommend`,
      {
        params: {
          hashtag: hashtag,
          page,
          size: 20,
        },
      },
    )
    return data.result
  }
}
