import React from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import UserService from '../userService'
import { queryKeys } from '../../../config/queryKeys'
import { useLocation, useNavigate } from 'react-router-dom'

const useInterestCelebQuery = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const currentRoute = location.pathname
  const user = new UserService()

  const getInterestCeleb = useQuery(queryKeys.interestCeleb, () => user.getInterestCeleb())

  const postInterestCeleb = useMutation(
    (celebIdList: Array<number>) => user.postInterestCeleb(celebIdList),
    {
      onSuccess: (res, celebIdList) => {
        if (currentRoute === '/select-celeb') {
          console.log(celebIdList)
          console.log(res)
          navigate('./complete')
        } else {
          console.log(celebIdList)
          console.log(res)
          alert('관심셀럽이 수정되었어요')
          navigate('/mypage')
        }
      },
    },
  )
  return { getInterestCeleb, postInterestCeleb }
}

export default useInterestCelebQuery
