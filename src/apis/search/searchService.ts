import request from '../core'
import { GetPaginationResult, ResponseType } from '../core/type'
import { Img, Item } from '../question/questionService.type'
import { IUserResult } from '../user/userService'

export interface SearchItemResult {
  itemId: number
  imgUrl: string
  brandName: string
  itemName: string
  celebName: string
  scrapStatus: boolean
}
export interface QuestionImg {
  imgUrl: string
  sortOrder: number
}

export interface SearchQuestionResult {
  id: number
  title: string
  content: string
  celebName: string
  imgList: Array<QuestionImg> | null
  itemImgList: Array<QuestionImg> | null
  categoryName: Array<string> | null
  qtype: string
  user: {
    id: number
    nickName: string
    profileImgUrl: string
  }
  likeNum?: number
  viewNum?: number
  commentNum?: number
}

export interface BuyHomeResult {
  id: number
  title: string
  content: string
  celebName: string
  imgList: Array<Img> | null
  itemImgList: Array<Item> | null
  categoryName: Array<string> | null
  qtype: string
  user: {
    id: number
    nickName: string
    profileImgUrl: string
  }
  voteEndTime: string
  selectedVoteNum: number // 자신이 투표한 아이템
  voteNum: number // 총 투표수
  hasMine: boolean
  voteStatus: false
}

export interface IRecentSearch {
  keyword: string
}
export interface ITotalSearch {
  itemList: Array<SearchItemResult>
  questionList: Array<SearchQuestionResult>
  userList: Array<IUserResult>
}

export default class SearchService {
  searchUrl: string

  constructor() {
    this.searchUrl = '/app/search'
  }
  // 아이템 검색
  async searchItem(keyword: string, page: number) {
    const data: ResponseType<GetPaginationResult<SearchItemResult>> = await request.get(
      `${this.searchUrl}/item`,
      {
        params: {
          keyword,
          page,
          size: 30,
        },
      },
    )
    return data.result
  }

  // 커뮤니티 검색
  async searchCommunity(keyword: string, page: number) {
    const data: ResponseType<GetPaginationResult<SearchItemResult>> = await request.get(
      `${this.searchUrl}/question`,
      {
        params: {
          keyword,
          page,
          size: 30,
        },
      },
    )
    return data.result
  }

  // 유저 검색
  async searchUser(keyword: string, page: number) {
    const data: ResponseType<GetPaginationResult<IUserResult>> = await request.get(
      `${this.searchUrl}/user`,
      {
        params: {
          keyword,
          page,
          size: 30,
        },
      },
    )
    return data.result
  }

  // 최근 검색어 조회
  async getRecentSearch() {
    const data: ResponseType<Array<IRecentSearch>> = await request.get(
      `${this.searchUrl}/recentSearch`,
    )
    return data.result
  }
  // 검색어 자동완성
  async getSearchKeywordPreview(keyword: string, page: number) {
    const data: ResponseType<GetPaginationResult<IRecentSearch>> = await request.get(
      `${this.searchUrl}/keyword`,
      {
        params: {
          keyword,
          page,
          size: 20,
        },
      },
    )
    return data.result
  }
  // 통합 검색
  async searchTotal(keyword: string) {
    const data: ResponseType<ITotalSearch> = await request.get(`${this.searchUrl}/total`, {
      params: {
        keyword,
      },
      timeout: 5000,
    })
    return data.result
  }
  // 인기 검색어 조회
  async getSearchRank() {
    const data: ResponseType<Array<IRecentSearch>> = await request.get(
      `${this.searchUrl}/searchRank`,
    )
    return data.result
  }
  // 최근 검색어 삭제
  async deleteRecentSearch(keyword: string) {
    const data: ResponseType = await request.delete(`${this.searchUrl}/recentSearch`, {
      params: {
        keyword,
      },
    })
    return data
  }

  // 최근 검색어 [모두] 삭제
  async deleteAllRecentSearch() {
    const data: ResponseType = await request.delete(`${this.searchUrl}/recentSearch/all`)
    return data
  }
}
