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
}
