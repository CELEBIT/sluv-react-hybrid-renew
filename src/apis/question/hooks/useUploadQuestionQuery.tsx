import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { localStorageKeys } from '../../../config/localStorageKeys'
import QuestionService from '../questionService'
import { CommunityItem, communityItemState, imgItemListState } from '../../../recoil/communityInfo'
import { queryKeys } from '../../../config/queryKeys'
import { useResetRecoilState } from 'recoil'

const useUploadQuestionQuery = () => {
  const question = new QuestionService()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const resetCommunityItem = useResetRecoilState(communityItemState)
  const resetImageItemList = useResetRecoilState(imgItemListState)

  const postFindRequest = useMutation((item: CommunityItem) => question.postFindRequest(item), {
    onSuccess: (res) => {
      if (res?.id) {
        console.log(res)
        resetCommunityItem()
        resetImageItemList()
        queryClient.invalidateQueries(queryKeys.questionDetail(res.id))
        navigate(`/community/detail/${res.id}`)
      }
    },
  })

  const postBuyRequest = useMutation((item: CommunityItem) => question.postBuyRequest(item), {
    onSuccess: (res) => {
      if (res?.id) {
        resetImageItemList()
        navigate(`/community/detail/${res.id}`)
      }
    },
  })

  const postHowAboutRequest = useMutation(
    (item: CommunityItem) => question.postHowAboutRequest(item),
    {
      onSuccess: (res) => {
        if (res?.id) {
          queryClient.invalidateQueries(queryKeys.getQuestionHowAboutList())
          resetCommunityItem()
          resetImageItemList()
          navigate(`/community/detail/${res.id}`)
        }
      },
    },
  )

  const postRecommendRequest = useMutation(
    (item: CommunityItem) => question.postRecommendRequest(item),
    {
      onSuccess: (res) => {
        if (res?.id) {
          queryClient.invalidateQueries(queryKeys.getQuestionRecommendList())
          resetCommunityItem()
          resetImageItemList()
          navigate(`/community/detail/${res.id}`)
        }
      },
    },
  )
  return { postFindRequest, postBuyRequest, postHowAboutRequest, postRecommendRequest }
}

export default useUploadQuestionQuery
