import request from '../core'
import { GetPaginationResult, ResponseType } from '../core/type'
import { RecommendItemResult } from '../item/itemService.type'
import { SearchQuestionResult } from '../search/searchService'

export interface ICelebResult {
  id: number
  celebNameKr: string
  celebCategory?: string
  subCelebList?: Array<ICelebResult>
}

export interface ICategoryInterestResult {
  categoryName: string
  celebList: Array<ICelebResult>
}

export interface IIdResult {
  email: string
  snsType: string
}

export interface IUserResult {
  id: number
  nickName: string
  profileImgUrl: string
  followStatus: boolean
}

export interface IUserClosetList {
  name: string
  coverImgUrl: string
  closetStatus: string
  color: string
  itemNum: number
}

export interface IUserMypageInfo {
  userInfo: {
    id: number
    nickName: string
    profileImgUrl: string
  }
  followStatus: true
  followerCount: number
  followingCount: number
  itemCount: number
  imgList: Array<string>
  communityCount: number
}

export interface ICommentResult {
  id: number
  questionTitle: string
  content: string
  ICommentResult: string
}

export interface ITermsAgreement {
  termsStatus: boolean
}

export default class UserService {
  userCelebUrl: string
  userUrl: string
  closetUrl: string
  constructor() {
    this.userCelebUrl = '/app/user/celeb'
    this.userUrl = '/app/user'
    this.closetUrl = '/app/closet'
  }

  async getIdInfo() {
    const data: ResponseType<IIdResult> = await request.get(`${this.userUrl}/social`)
    return data.result
  }

  // 유저의 관심셀럽 조회
  async getInterestCeleb() {
    const data: ResponseType<Array<ICelebResult>> = await request.get(`${this.userCelebUrl}`)
    return data.result
  }

  // 유저의 관심셀럽 with 카테고리 조회
  async getInterestCelebWithCategory() {
    const data: ResponseType<Array<ICategoryInterestResult>> = await request.get(
      `${this.userCelebUrl}/category`,
    )
    return data.result
  }

  // 다른 유저의 관심셀럽 조회
  async getOtherUserInterestCeleb(userId: number) {
    const data: ResponseType<Array<ICelebResult>> = await request.get(
      `${this.userUrl}/${userId}/celeb`,
    )
    return data.result
  }

  // 다른 유저의 관심셀럽 with 카테고리 조회
  async getOtherUserInterestCelebWithCategory(userId: number) {
    const data: ResponseType<Array<ICategoryInterestResult>> = await request.get(
      `${this.userUrl}/${userId}/celeb/category`,
    )
    return data.result
  }

  // 팔로우, 언팔로우
  async followUser(userId: number | null) {
    const data: ResponseType = await request.post(`${this.userUrl}/${userId}/follow`)
    return data
  }

  async getFollowerList(page: number) {
    const data: ResponseType<GetPaginationResult<IUserResult>> = await request.get(
      `${this.userUrl}/follower`,
      {
        params: {
          page,
          size: 20,
        },
      },
    )
    return data.result
  }

  async getFollowingList(page: number) {
    const data: ResponseType<GetPaginationResult<IUserResult>> = await request.get(
      `${this.userUrl}/following`,
      {
        params: {
          page,
          size: 20,
        },
      },
    )
    return data.result
  }

  // 타유저의 팔로우/팔로잉 리스트
  async getUserFollowerList(userId: number, page: number) {
    const data: ResponseType<GetPaginationResult<IUserResult>> = await request.get(
      `${this.userUrl}/${userId}/follower`,
      {
        params: {
          page,
          size: 20,
        },
      },
    )
    return data.result
  }

  async getUserFollowingList(userId: number, page: number) {
    const data: ResponseType<GetPaginationResult<IUserResult>> = await request.get(
      `${this.userUrl}/${userId}/following`,
      {
        params: {
          page,
          size: 20,
        },
      },
    )
    return data.result
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
    const data: ResponseType<GetPaginationResult<RecommendItemResult>> = await request.get(
      `${this.userUrl}/item`,
      {
        params: {
          page,
          size: 20,
        },
      },
    )
    return data.result
  }

  // 타 유저 업로드 게시물 조회
  async getOtherUserUploadItem(page: number, userId: number) {
    const data: ResponseType<GetPaginationResult<RecommendItemResult>> = await request.get(
      `${this.userUrl}/${userId}/item`,
      {
        params: {
          page,
        },
      },
    )
    return data.result
  }
  // 유저 옷장 아이템 조회
  async getUserClosetList() {
    const data: ResponseType<Array<RecommendItemResult>> = await request.get(
      `${this.closetUrl}/list`,
    )
    return data.result
  }

  // 타 유저 옷장 아이템 조회
  async getOtherUserClosetList(page: number, userId: number) {
    const data: ResponseType<GetPaginationResult<RecommendItemResult>> = await request.get(
      `${this.userUrl}/${userId}/closet`,
      {
        params: {
          page,
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

  // 현재 유저 마이페이지 조회
  async getUserMypageInfo() {
    const data: ResponseType<IUserMypageInfo> = await request.get(`${this.userUrl}/mypage`)
    return data.result
  }

  // 현재 유저 마이페이지 조회
  async getOtherUserMypageInfo(userId: number) {
    const data: ResponseType<IUserMypageInfo> = await request.get(
      `${this.userUrl}/${userId}/mypage`,
    )
    return data.result
  }

  // 현재 유저가 좋아요한 아이템
  async getUserLikeItem(page: number) {
    const data: ResponseType<GetPaginationResult<RecommendItemResult>> = await request.get(
      `${this.userUrl}/like/item`,
      {
        params: {
          size: 20,
          page,
        },
      },
    )
    return data.result
  }

  // 현재 유저가 업로드한 커뮤니티 게시글
  async getUserUploadQuestion(page: number) {
    const data: ResponseType<GetPaginationResult<SearchQuestionResult>> = await request.get(
      `${this.userUrl}/question`,
      {
        params: {
          page,
        },
      },
    )
    return data.result
  }

  // 현재 유저가 업로드한 커뮤니티 댓글
  async getUserUploadComment(page: number) {
    const data: ResponseType<GetPaginationResult<ICommentResult>> = await request.get(
      `${this.userUrl}/comment`,
      {
        params: {
          page,
        },
      },
    )
    return data.result
  }

  // 현재 유저가 최근 본 커뮤니티 게시글
  async getRecentViewCommunityItem(page: number) {
    const data: ResponseType<GetPaginationResult<SearchQuestionResult>> = await request.get(
      `${this.userUrl}/recent/question`,
      {
        params: {
          page,
        },
      },
    )
    return data.result
  }

  // 현재 유저가 좋아요한 커뮤니티 게시글
  // async getLikeCommunityQuestion(page: number) {
  //   const data: ResponseType<GetPaginationResult<SearchQuestionResult>> = await request.get(
  //     `${this.userUrl}/like/question`,
  //     {
  //       params: {
  //         page,
  //       },
  //     },
  //   )
  //   return data.result
  // }

  // 현재 유저가 좋아한 커뮤니티 댓글
  async getUserLikedComment(page: number) {
    const data: ResponseType<GetPaginationResult<ICommentResult>> = await request.get(
      `${this.userUrl}/like/comment`,
      {
        params: {
          page,
        },
      },
    )
    return data.result
  }

  // 프로필 등록 / 수정
  async submitProfile(nickName: string, imgUrl: string) {
    const data: ResponseType = await request.post(`${this.userUrl}/profile`, { imgUrl, nickName })
    return data
  }

  // 프로필 이미지  수정
  async editProfileImage(imgUrl: string) {
    const data: ResponseType = await request.patch(`${this.userUrl}/profileImg`, { imgUrl })
    return data
  }

  // 프로필 이미지  삭제
  async deleteProfileImage() {
    const data: ResponseType = await request.delete(`${this.userUrl}/profileImg`)
    return data
  }

  // 약관 동의
  async termsAgree() {
    const data: ResponseType = await request.post(`${this.userUrl}/terms`)
    return data
  }

  // 현재 유저 마이페이지 조회
  async getMarketingAgreement() {
    const data: ResponseType<ITermsAgreement> = await request.get(`${this.userUrl}/terms`)
    return data.result
  }
}
