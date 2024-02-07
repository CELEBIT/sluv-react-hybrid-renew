import { useMutation } from '@tanstack/react-query'
import React from 'react'
import ItemService from '../itemService'
import { TempItemReq } from '../itemService.type'
import { useNavigate } from 'react-router-dom'
import { localStorageKeys } from '../../../config/localStorageKeys'

const useItemQuery = () => {
  const item = new ItemService()
  const navigate = useNavigate()
  const postItem = useMutation((itemReq: TempItemReq) => item.postItem(itemReq), {
    onSuccess: (res) => {
      if (res?.itemId) {
        navigate(`/item/detail/${res.itemId}`)
        localStorage.removeItem(localStorageKeys.TEMP_ITEM_ID)
      }
    },
  })
  return { postItem }
}

export default useItemQuery
