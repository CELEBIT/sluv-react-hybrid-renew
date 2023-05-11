import request from '../core'
import { BrandFlag, GetPaginationResult, ResponseType } from '../core/type'

export interface RecentBrandResult {
  id: number
  brandName: string
  flag: string
}
// [인기 브랜드 조회, 브랜드 검색] 에서 사용 중
export interface TopBrandResult {
  id: number
  brandKr: string
  brandEn: string
  brandImgUrl: string
}

export default class BrandService {
  brandUrl: string
  recentBrandUrl: string

  constructor() {
    this.brandUrl = '/app/brand'
    this.recentBrandUrl = '/app/brand/recent'
  }

  // 유저가 최근 선택한 브랜드 조회
  async getBrandRecentSelected() {
    const data: ResponseType<Array<RecentBrandResult>> = await request.get(`${this.recentBrandUrl}`)

    return data.result
  }
  // 최근 선택한 브랜드 [선택] 삭제
  async deleteRecentBrand(brandId: number, flag: BrandFlag) {
    const data: ResponseType = await request.delete(`${this.recentBrandUrl}/${brandId}`, {
      params: {
        flag,
      },
    })
    return data
  }
  // 인기 브랜드 조회
  async getBrandTop() {
    const data: ResponseType<Array<TopBrandResult>> = await request.get(`${this.brandUrl}/top`)

    return data.result
  }
  // 브랜드 검색
  async searchBrand(brandName: string, page: number) {
    const data: ResponseType<GetPaginationResult<TopBrandResult>> = await request.get(
      `${this.brandUrl}/search`,
      {
        params: {
          brandName,
          page,
          size: 20,
        },
      },
    )
    return data.result
  }
}
