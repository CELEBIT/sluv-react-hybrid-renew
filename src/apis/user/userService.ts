import request from '../core'
import { ResponseType } from '../core/type'

export interface ICelebResult {
  id: number
  celebNameKr: string
  subCelebList?: Array<ICelebResult>
}

export default class UserService {
  userCelebUrl: string
  userUrl: string
  constructor() {
    this.userCelebUrl = '/app/user/celeb'
    this.userUrl = '/app/user'
  }

  // 유저의 관심셀럽 조회
  async getInterestCeleb() {
    const data: ResponseType<Array<ICelebResult>> = await request.get(`${this.userCelebUrl}`)
    return data.result
  }

  // 팔로우, 언팔로우
  async followUser(userId: number | null) {
    const data: ResponseType = await request.post(`${this.userUrl}/${userId}/follow`)
    return data
  }

  // 유저 신고
  async reportUser(userId: number | undefined, reason: string, content: string) {
    console.log('유저 id', userId)
    const data: ResponseType = await request.post(`${this.userUrl}/${userId}/report`, {
      reason,
      content,
    })
    return data
  }
}
