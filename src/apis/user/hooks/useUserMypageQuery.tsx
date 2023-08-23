import { UseInfiniteQueryResult, useInfiniteQuery, useQuery } from '@tanstack/react-query'
import UserService, { ICommentResult } from '../userService'
import { queryKeys } from '../../../config/queryKeys'
import { GetPaginationResult } from '../../core/type'
import { RecommendItemResult } from '../../item/itemService.type'
import { SearchQuestionResult } from '../../search/searchService'

const useUserMypageQuery = () => {
  const user = new UserService()

  const getMypageInfo = useQuery(queryKeys.getMypageInfo, () => user.getUserMypageInfo())

  const getOtherUserMypageInfo = (userId: number) => {
    return useQuery(queryKeys.getOtherUserMypageInfo(userId), () =>
      user.getOtherUserMypageInfo(userId),
    )
  }

  // 좋아요한 아이템
  const getUserLikeItem = (): UseInfiniteQueryResult<
    GetPaginationResult<RecommendItemResult>,
    any
  > => {
    return useInfiniteQuery(
      queryKeys.userLikeItem,
      ({ pageParam = 0 }) => user.getUserLikeItem(pageParam),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.hasNext) return lastPage.page + 1
          return undefined
        },
      },
    )
  }

  // 업로드한 커뮤니티 게시글
  const getUserUploadQuestion = (): UseInfiniteQueryResult<
    GetPaginationResult<SearchQuestionResult>,
    any
  > => {
    return useInfiniteQuery(
      queryKeys.userUploadQuestion,
      ({ pageParam = 0 }) => user.getUserUploadQuestion(pageParam),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.hasNext) return lastPage.page + 1
          return undefined
        },
      },
    )
  }

  // 업로드한 커뮤니티 댓글
  const getUserUploadComment = (): UseInfiniteQueryResult<
    GetPaginationResult<ICommentResult>,
    any
  > => {
    return useInfiniteQuery(
      queryKeys.userUploadComment,
      ({ pageParam = 0 }) => user.getUserUploadComment(pageParam),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.hasNext) return lastPage.page + 1
          return undefined
        },
      },
    )
  }

  const getRecentViewCommunityItem = (): UseInfiniteQueryResult<
    GetPaginationResult<SearchQuestionResult>,
    any
  > => {
    return useInfiniteQuery(
      queryKeys.recentViewCommunityItem,
      ({ pageParam = 0 }) => user.getRecentViewCommunityItem(pageParam),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.hasNext) return lastPage.page + 1
          return undefined
        },
      },
    )
  }

  return {
    getMypageInfo,
    getOtherUserMypageInfo,
    getUserLikeItem,
    getUserUploadQuestion,
    getUserUploadComment,
    getRecentViewCommunityItem,
  }
}

export default useUserMypageQuery
