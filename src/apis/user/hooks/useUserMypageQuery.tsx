import {
  UseInfiniteQueryResult,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import UserService, { ICommentResult } from '../userService'
import { queryKeys } from '../../../config/queryKeys'
import { GetPaginationResult } from '../../core/type'
import { RecommendItemResult } from '../../item/itemService.type'
import { SearchQuestionResult } from '../../search/searchService'
import { SignupValues } from '../../../models/signup'
import { error } from 'console'
import { WithdrawReason } from '../../../pages/settings/RequestWithdraw'
import { modals } from '../../../components/Modals'
import useModals from '../../../components/Modals/hooks/useModals'

const useUserMypageQuery = () => {
  const user = new UserService()
  const queryClient = useQueryClient()
  const { openModal } = useModals()

  const getMypageInfo = () => useQuery(queryKeys.getMypageInfo, () => user.getUserMypageInfo())

  const getIdInfo = () => useQuery(queryKeys.getIdInfo, () => user.getIdInfo())

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

  // 업로드한 커뮤니티 게시글
  const getUserLikedQuestion = (): UseInfiniteQueryResult<
    GetPaginationResult<SearchQuestionResult>,
    any
  > => {
    return useInfiniteQuery(
      queryKeys.likedQuestion,
      ({ pageParam = 0 }) => user.getUserLikedQuestion(pageParam),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.hasNext) return lastPage.page + 1
          return undefined
        },
      },
    )
  }

  // 좋아요한 커뮤니티 댓글
  const getLikedComment = (): UseInfiniteQueryResult<GetPaginationResult<ICommentResult>, any> => {
    return useInfiniteQuery(
      queryKeys.likedComment,
      ({ pageParam = 0 }) => user.getUserLikedComment(pageParam),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.hasNext) return lastPage.page + 1
          return undefined
        },
      },
    )
  }

  type IProfile = {
    nickname: string
    userImg: string
  }

  // 프로필 등록 & 수정
  const uploadProfile = useMutation(
    ({ nickname, userImg }: IProfile) => user.submitProfile(nickname, userImg),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.getMypageInfo)
      },
    },
  )

  // 프로필 이미지 수정
  const editProfileImage = useMutation((userImg: string) => user.editProfileImage(userImg), {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.getMypageInfo)
    },
  })

  // 프로필 이미지 삭제
  const deleteProfileImage = useMutation(() => user.deleteProfileImage(), {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.getMypageInfo)
    },
  })

  // 마케팅 약관 동의 post
  const termsAgree = useMutation(queryKeys.termsAgree, () => user.termsAgree(), {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.getMarketingAgreeStatus)
    },
  })

  const getMarketingAgreeStatus = useQuery(queryKeys.getMarketingAgreeStatus, () =>
    user.getMarketingAgreement(),
  )

  const withdrawUser = useMutation(
    ({ reason, content }: WithdrawReason) => user.withdrawUser(reason, content),
    {
      onSuccess: (res) => {
        if (res.code == 1000) {
          openModal(modals.ConfirmWithdrawModal)
        }
      },
    },
  )

  return {
    getMypageInfo,
    getIdInfo,
    getOtherUserMypageInfo,
    getUserLikeItem,
    getUserUploadQuestion,
    getUserUploadComment,
    getRecentViewCommunityItem,
    getLikedComment,
    getUserLikedQuestion,
    uploadProfile,
    editProfileImage,
    deleteProfileImage,
    termsAgree,
    getMarketingAgreeStatus,
    withdrawUser,
  }
}

export default useUserMypageQuery
