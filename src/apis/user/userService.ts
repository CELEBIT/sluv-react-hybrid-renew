import request from '../core'
import { GetPaginationResult, ResponseType } from '../core/type'
import { ItemResult } from '../item/itemService.type'

export interface ICelebResult {
  id: number
  celebNameKr: string
  subCelebList?: Array<ICelebResult>
}

export interface IUserResult {
  id: number
  nickName: string
  profileImgUrl: string
  followStatus: boolean
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

  // 유저 업로드 게시물 조회
  async getUserUploadItem(page: number) {
    const data: ResponseType<GetPaginationResult<ItemResult>> = await request.get(
      `${this.userUrl}/item`,
      {
        params: {
          page,
          size: 21,
        },
      },
    )
    return data.result
  }

  async getHotSluver(celebId: number | undefined) {
    const data: ResponseType<Array<IUserResult>> = await request.get(`${this.userUrl}/hotSluver`, {
      params: {
        celebId: celebId,
      },
    })
    return data.result
  }

  // 유저 관심 셀럽 등록
  async postInterestCeleb(celebIdList: Array<number>) {
    const data: ResponseType = await request.post(`${this.userUrl}/celeb`, {
      celebIdList,
    })
    return data
  }
}
