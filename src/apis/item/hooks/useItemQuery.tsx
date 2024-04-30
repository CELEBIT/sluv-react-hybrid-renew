import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import ItemService from '../itemService'
import { TempItemReq } from '../itemService.type'
import { useLocation, useNavigate } from 'react-router-dom'
import { localStorageKeys } from '../../../config/localStorageKeys'
import { queryKeys } from '../../../config/queryKeys'
import { useResetRecoilState } from 'recoil'
import { createItemCelebState, itemInfoState } from '../../../recoil/itemInfo'
import {
  parentCategoryState,
  subCategoryState,
} from '../../../components/BottomSheetModal/ItemCategoryModal'
import { imgListState } from '../../../components/AddPhotos/AddPhotos'

const useItemQuery = () => {
  const item = new ItemService()
  const location = useLocation()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const resetItemInfo = useResetRecoilState(itemInfoState)
  const resetCelebInfoInItem = useResetRecoilState(createItemCelebState)
  const resetCategory = useResetRecoilState(subCategoryState)
  const resetParentCategory = useResetRecoilState(parentCategoryState)
  const resetImgListState = useResetRecoilState(imgListState)
  const postItem = useMutation((itemReq: TempItemReq) => item.postItem(itemReq), {
    onSuccess: (res) => {
      console.log(res)
      if (res?.itemId) {
        if (location.pathname.includes('edit')) {
          alert('게시글이 수정되었어요')
        }
        queryClient.invalidateQueries()
        resetItemInfo()
        resetCelebInfoInItem()
        resetCategory()
        resetParentCategory()
        resetImgListState()

        navigate(`/item/detail/${res.itemId}`)
        localStorage.removeItem(localStorageKeys.TEMP_ITEM_ID)
      }
    },
  })
  return { postItem }
}

export default useItemQuery
