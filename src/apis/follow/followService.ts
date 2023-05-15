import request from '../core'
import { ResponseType } from '../core/type'

export default class UserService {
  followUrl: string

  constructor() {
    this.followUrl = '/app/user'
  }

  // 팔로우, 언팔로우
  async followUser(userId: number | null) {
    const data: ResponseType = await request.post(`${this.followUrl}/${userId}/follow`)
    return data
  }
}
