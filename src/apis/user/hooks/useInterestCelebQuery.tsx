import React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import UserService from '../userService'
import { queryKeys } from '../../../config/queryKeys'
import { useLocation, useNavigate } from 'react-router-dom'

const useInterestCelebQuery = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryClient = useQueryClient()
  const currentRoute = location.pathname
  const user = new UserService()

  // 현재 유저의 관심셀럽 리스트
  const getInterestCeleb = useQuery(queryKeys.interestCeleb, () => user.getInterestCeleb())
  const getInterestCelebWithCategory = useQuery(queryKeys.interestCelebWithCategory, () =>
    user.getInterestCelebWithCategory(),
  )

  // 다른 유저의 관심셀럽 리스트
  const getOtherUserInterestCeleb = (userId: number) =>
    useQuery(queryKeys.otherUserInterestCeleb(userId), () => user.getOtherUserInterestCeleb(userId))

  const getOtherUserInterestCelebWithCategory = (userId: number) =>
    useQuery(queryKeys.otherUserInterestCelebWithCategory(userId), () =>
      user.getOtherUserInterestCelebWithCategory(userId),
    )

  const postInterestCeleb = useMutation(
    (celebIdList: Array<number>) => user.postInterestCeleb(celebIdList),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries()
        if (currentRoute === '/settings/select-celeb') {
          alert('관심셀럽이 수정되었어요')
          navigate('/settings')
        }
      },
    },
  )
  return {
    getInterestCeleb,
    getInterestCelebWithCategory,
    getOtherUserInterestCeleb,
    getOtherUserInterestCelebWithCategory,
    postInterestCeleb,
  }
}

export default useInterestCelebQuery
