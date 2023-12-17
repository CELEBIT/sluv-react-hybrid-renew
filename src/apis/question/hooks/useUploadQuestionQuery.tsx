import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { localStorageKeys } from '../../../config/localStorageKeys'
import QuestionService from '../questionService'
import { CommunityItem } from '../../../recoil/communityInfo'
import { queryKeys } from '../../../config/queryKeys'

const useUploadQuestionQuery = () => {
  const question = new QuestionService()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const postFindRequest = useMutation((item: CommunityItem) => question.postFindRequest(item), {
    onSuccess: (res) => {
      if (res?.id) {
        queryClient.invalidateQueries(queryKeys.questionDetail(res.id))
        navigate(`/community/detail/${res.id}`)
      }
    },
  })

  const postBuyRequest = useMutation((item: CommunityItem) => question.postBuyRequest(item), {
    onSuccess: (res) => {
      if (res?.id) {
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
          navigate(`/community/detail/${res.id}`)
        }
      },
    },
  )
  return { postFindRequest, postBuyRequest, postHowAboutRequest, postRecommendRequest }
}

export default useUploadQuestionQuery
