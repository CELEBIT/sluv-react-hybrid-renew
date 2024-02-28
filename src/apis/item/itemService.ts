import { IHashTag } from '../../recoil/itemInfo'
import request from '../core'
import { GetPaginationResult, ResponseType } from '../core/type'
import { SearchQuestionResult } from '../search/searchService'
import {
  HashtagContent,
  ItemDetailResult,
  ItemId,
  ItemResult,
  ParentCategoryResult,
  RecommendItemResult,
  TempItemId,
  TempItemReq,
  TempItemResult,
} from './itemService.type'

export default class ItemService {
  itemUrl: string
  tempItemUrl: string
  hashtagUrl: string
  scrapItemUrl: string
  hotItemUrl: string

  constructor() {
    this.itemUrl = '/app/item'
    this.tempItemUrl = '/app/item/temp'
    this.hashtagUrl = '/app/item/hashtag'
    this.scrapItemUrl = '/app/item/scrap'
    this.hotItemUrl = '/app/item/hot'
  }

  // 아이템 카테고리 조회
  async getItemCategory() {
    const data: ResponseType<Array<ParentCategoryResult>> = await request.get(
      `${this.itemUrl}/category`,
    )

    return data.result
  }
  // 임시저장 아이템 게시글 조회
  async getTempItem(page: number) {
    const data: ResponseType<GetPaginationResult<TempItemResult>> = await request.get(
      `${this.tempItemUrl}`,
      {
        params: {
          page,
          size: 20,
        },
      },
    )
    return data.result
  }
  // 아이템 게시글 상세 조회
  async getItemDetail(itemId: number) {
    const data: ResponseType<ItemDetailResult> = await request.get(`${this.itemUrl}/${itemId}`)

    return data.result
  }
  // 해시태그 검색
  async searchHashtag(name: string) {
    const data: ResponseType<GetPaginationResult<HashtagContent>> = await request.get(
      `${this.hashtagUrl}`,
      {
        params: {
          name,
          page: 0,
          size: 20,
        },
      },
    )
    return data.result?.content
  }
  // 해시태그 등록
  async postHashtag(hashtagContent: string) {
    const data: ResponseType<IHashTag> = await request.post(`${this.hashtagUrl}`, {
      hashtagContent,
    })
    return data.result
  }

  // 아이템 좋아요
  async likeItem(itemId: number | null) {
    const data: ResponseType = await request.post(`${this.itemUrl}/${itemId}/like`)
    return data
  }
  // 아이템 삭제
  async deleteItem(itemId: number | null) {
    const data: ResponseType = await request.delete(`${this.itemUrl}/${itemId}`)
    return data
  }
  // 아이템 수정요청
  async requsetEditItem(itemId: number, reason: string, content: string) {
    const data: ResponseType = await request.post(`${this.itemUrl}/${itemId}/edit-req`, {
      reason,
      content,
    })
    return data
  }
  // 아이템 신고
  async reportItem(itemId: number, reason: string, content: string) {
    const data: ResponseType = await request.post(`${this.itemUrl}/${itemId}/report`, {
      reason,
      content,
    })
    return data
  }
  // 임시저장 아이템 선택삭제
  async deleteTempItem(idArray: Array<number>) {
    const result = await Promise.allSettled(
      idArray.map(async (id) => {
        const data: ResponseType = await request.delete(`${this.tempItemUrl}/${id}`)
        return data
      }),
    )
    return await result
  }
  // 임시저장 아이템 전체삭제
  async deleteTempItemAll() {
    const data: ResponseType = await request.delete(`${this.tempItemUrl}`)
    return data
  }
  // 임시저장 아이템 저장
  async postTempItem(tempItem: TempItemReq) {
    const data: ResponseType<TempItemId> = await request.post(`${this.tempItemUrl}`, tempItem)
    console.log('tempItem in postTempItem', tempItem)
    return data.result
  }
  // 아이템 등록 및 수정
  async postItem(item: TempItemReq) {
    const data: ResponseType<ItemId> = await request.post(`${this.itemUrl}`, item)
    return data.result
  }

  // 최근 본 아이템
  async getRecentViewItem(page: number, size?: number) {
    const data: ResponseType<GetPaginationResult<ItemResult>> = await request.get(
      `${this.itemUrl}/recent`,
      {
        params: {
          page,
          size: 21,
        },
      },
    )
    return data.result
  }

  // 찜한 아이템
  async getScrapItem(page: number) {
    const data: ResponseType<GetPaginationResult<ItemResult>> = await request.get(
      `${this.scrapItemUrl}`,
      {
        params: {
          page,
          size: 21,
        },
      },
    )
    return data.result
  }

  // 커뮤니티 아이템 선택 인기 아이템 조회
  async getHotItem() {
    const data: ResponseType<RecommendItemResult> = await request.get(`${this.hotItemUrl}`)
    return data.result
  }

  // 지금 당장 구매 가능한 아이템 조회
  async getBuyNowItem(page: number) {
    const data: ResponseType<GetPaginationResult<ItemResult>> = await request.get(
      `${this.itemUrl}/nowBuy`,
      {
        params: {
          page,
          size: 10,
        },
      },
    )
    return data.result
  }

  // 최신 등록 아이템 조회
  async getNewItem(page: number) {
    const data: ResponseType<GetPaginationResult<ItemResult>> = await request.get(
      `${this.itemUrl}/new`,
      {
        params: {
          page,
          size: 20,
        },
      },
    )
    return data.result
  }

  // 주목해야할 럭셔리 무드 아이템 조회
  async getLuxuryItem(page: number) {
    const data: ResponseType<GetPaginationResult<ItemResult>> = await request.get(
      `${this.itemUrl}/luxury`,
      {
        params: {
          page,
          size: 10,
        },
      },
    )
    return data.result
  }

  // 가성비 좋은 선물템 조회
  async getEfficientItem(page: number) {
    const data: ResponseType<GetPaginationResult<ItemResult>> = await request.get(
      `${this.itemUrl}/efficient`,
      {
        params: {
          page,
          size: 10,
        },
      },
    )
    return data.result
  }

  // Hot Celeb Item 조회
  async getHotCelebItem(standard: string) {
    const data: ResponseType<Array<ItemResult>> = await request.get(`${this.itemUrl}/hotItem`, {
      params: {
        standard: standard,
      },
    })
    return data.result
  }

  // 한눈에 보는 취향 큐레이션 조회
  async getCurationItem() {
    const data: ResponseType<Array<ItemResult>> = await request.get(`${this.itemUrl}/curation`)
    return data.result
  }

  //
  async getHowAboutItem() {
    const data: ResponseType<Array<ItemResult>> = await request.get(`${this.itemUrl}/howabout`)
    return data.result
  }

  // 같은 셀럽 아이템
  async getSameCelebItem(itemId: number) {
    const data: ResponseType<RecommendItemResult[]> = await request.get(
      `${this.itemUrl}/sameCelebItem`,
      {
        params: {
          itemId,
        },
      },
    )
    return data.result
  }
  // 같은 브랜드 아이템
  async getSameBrandItem(itemId: number) {
    const data: ResponseType<RecommendItemResult[]> = await request.get(
      `${this.itemUrl}/sameBrandItem`,
      {
        params: {
          itemId,
        },
      },
    )
    return data.result
  }
  // 같은 셀럽 아이템
  async getSameScrapItem(itemId: number) {
    const data: ResponseType<RecommendItemResult[]> = await request.get(
      `${this.itemUrl}/togetherScrap`,
      {
        params: {
          itemId,
        },
      },
    )
    return data.result
  }

  // 지금 당장 구매 가능한 아이템 조회
  async getRecommendItem(page: number) {
    const data: ResponseType<GetPaginationResult<RecommendItemResult[]>> = await request.get(
      `${this.itemUrl}/recommend`,
      {
        params: {
          page,
          size: 10,
        },
      },
    )
    return data.result
  }
}
