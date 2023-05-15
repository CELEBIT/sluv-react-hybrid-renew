import request from '../core'
import { ResponseType } from '../core/type'

export interface ICelebResult {
  id: number
  celebNameKr: string
  subCelebList?: Array<ICelebResult>
}

export default class UserService {
  userCelebUrl: string

  constructor() {
    this.userCelebUrl = '/app/user/celeb'
  }

  // 유저의 관심셀럽 조회
  async getInterestCeleb() {
    const data: ResponseType<Array<ICelebResult>> = await request.get(`${this.userCelebUrl}`)
    return data.result
  }
}
