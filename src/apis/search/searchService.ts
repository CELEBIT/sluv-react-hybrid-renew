import request from '../core'
import { GetPaginationResult, ResponseType } from '../core/type'

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
}
export interface SearchUserResult {
  id: number
  nickname: string
  profileImgUrl: string
  followStatus: boolean
}
export interface IRecentSearch {
  keyword: string
}
export interface ITotalSearch {
  itemList: Array<SearchItemResult>
  questionList: Array<SearchQuestionResult>
  userList: Array<SearchUserResult>
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
}
