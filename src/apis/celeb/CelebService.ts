import request from '../core'
import { GetPaginationResult, ResponseType } from '../core/type'

export interface IHotCeleb {
  id: number
  parentId: number
  category: string
  celebParentNameKr: string
  celebChildNameKr: string
  celebTotalNameKr: string
  celebTotalNameEn: string
}
export interface IRecentCeleb {
  id: number
  parentId?: number
  childCelebName: string
  parentCelebName?: string
  flag: CelebFlag
}
export type CelebFlag = 'Y' | 'N'
export interface ISearchCeleb {
  id: number
  parentId: number
  category: string
  celebParentNameKr: string
  celebChildNameKr: string
  celebTotalNameKr: string
  celebTotalNameEn: string
}

export default class CelebService {
  celebUrl: string

  constructor() {
    this.celebUrl = '/app/celeb'
  }

  // 인기 셀럽 조회
  async getHotCeleb() {
    const data: ResponseType<Array<IHotCeleb>> = await request.get(`${this.celebUrl}/top`)
    return data.result
  }
  // 유저가 최근 선택한 셀럽 조회
  async getRecentCeleb() {
    const data: ResponseType<Array<IRecentCeleb>> = await request.get(`${this.celebUrl}/recent`)
    return data.result
  }
  // 유저가 최근 선택한 셀럽 등록
  async postRecentCeleb(celebId: number | null, newCelebId: number | null) {
    const data: ResponseType = await request.post(`${this.celebUrl}/recent`, {
      celebId,
      newCelebId,
    })
    return data
  }
  // 유저가 최근 선택한 셀럽 [선택] 삭제
  async deleteRecentCeleb(celebId: number, flag: CelebFlag) {
    const data: ResponseType = await request.delete(`${this.celebUrl}/recent/${celebId}`, {
      params: {
        flag,
      },
    })
    return data
  }
  // 유저가 최근 선택한 셀럽 [모두] 삭제
  async deleteAllRecentCeleb() {
    const data: ResponseType = await request.delete(`${this.celebUrl}/recent`)
    return data
  }
  // 셀럽 검색
  async searchCeleb(celebName: string, page: number) {
    const data: ResponseType<GetPaginationResult<ISearchCeleb>> = await request.get(
      `${this.celebUrl}/search`,
      {
        params: {
          celebName,
          page,
          size: 20,
        },
      },
    )
    return data.result
  }
}
