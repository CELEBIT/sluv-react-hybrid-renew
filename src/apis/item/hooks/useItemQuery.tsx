import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import ItemService from '../itemService'
import { TempItemReq } from '../itemService.type'
import { useLocation, useNavigate } from 'react-router-dom'
import { localStorageKeys } from '../../../config/localStorageKeys'
import { queryKeys } from '../../../config/queryKeys'

const useItemQuery = () => {
  const item = new ItemService()
  const location = useLocation()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const postItem = useMutation((itemReq: TempItemReq) => item.postItem(itemReq), {
    onSuccess: (res) => {
      if (res?.itemId) {
        if (location.pathname.includes('edit')) {
          alert('게시글이 수정되었어요')
        }
        queryClient.invalidateQueries(queryKeys.itemDetail(res.itemId))

        navigate(`/item/detail/${res.itemId}`)
        localStorage.removeItem(localStorageKeys.TEMP_ITEM_ID)
      }
    },
  })
  return { postItem }
}

export default useItemQuery
