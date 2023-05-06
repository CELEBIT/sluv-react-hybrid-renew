import request from '../core'
import { GetResponseType } from '../core/type'

export interface RecentBrandResult {
  id: number
  brandName: string
  flag: string
}
export interface TopBrandResult {
  id: number
  brandKr: string
  brandEn: string
  brandImgUrl: string
}

export default class BrandService {
  brandUrl: string

  constructor() {
    this.brandUrl = '/app/brand'
  }

  // 유저가 최근 선택한 브랜드 조회
  async getBrandRecentSelected() {
    const data: GetResponseType<Array<RecentBrandResult>> = await request.get(
      `${this.brandUrl}/recent`,
    )

    return data.result
  }
  // 인기 브랜드 조회
  async getBrandTop() {
    const data: GetResponseType<Array<TopBrandResult>> = await request.get(`${this.brandUrl}/top`)

    return data.result
  }
  // 브랜드 검색
  // async searchBrand() {
  //   const data: GetResponseType<Array<>> = await request.get(
  //     `${this.brandUrl}/search`,
  //     {
  //       params: {

  //       }
  //     }
  //   )
  // }
}
