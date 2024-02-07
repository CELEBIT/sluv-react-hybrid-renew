import request from '../core'
import { ResponseType } from '../core/type'

export interface PlaceResult {
  placeName: string
}

export default class PlaceService {
  placeUrl: string

  constructor() {
    this.placeUrl = '/app/item/place'
  }

  // 핫 플레이스 조회
  async getHotPlace() {
    const data: ResponseType<Array<PlaceResult>> = await request.get(`${this.placeUrl}/top`)
    return data.result
  }
  // 유저가 최근 입력한 장소 조회
  async getRecentPlace() {
    const data: ResponseType<Array<PlaceResult>> = await request.get(`${this.placeUrl}/recent`)
    return data.result
  }
  // 유저의 최근 입력한 장소 [선택] 삭제
  async deleteRecentPlace(placeName: string) {
    const data: ResponseType = await request.delete(`${this.placeUrl}`, {
      params: {
        placename: placeName,
      },
    })
    return data
  }
  // 유저의 최근 입력한 장소 [모두] 삭제
  async deleteAllRecentPlace() {
    const data: ResponseType = await request.delete(`${this.placeUrl}/all`)
    return data
  }
  // 최근 입력한 장소 등록
  async postItemPlace(placeName: string) {
    const data: ResponseType = await request.post(`${this.placeUrl}`, {
      placeName,
    })
    return data
  }
}
