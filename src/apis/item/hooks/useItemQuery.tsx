import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import ItemService from '../itemService'
import { TempItemReq } from '../itemService.type'
import { useLocation, useNavigate } from 'react-router-dom'
import { localStorageKeys } from '../../../config/localStorageKeys'
import { queryKeys } from '../../../config/queryKeys'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import {
  createItemAddInfoState,
  createItemBrandState,
  createItemCategoryState,
  createItemCelebState,
  createItemLinkState,
  createItemNameState,
  createItemNewBrandState,
  createItemNewCelebState,
  createItemPlaceState,
  createItemPriceState,
  createItemSourceState,
  createItemWhenDateState,
  currentTempIdState,
  itemS3ImgListState,
} from '../../../recoil/itemInfo'
import {
  parentCategoryState,
  subCategoryState,
} from '../../../components/BottomSheetModal/ItemCategoryModal'
import { imgListState } from '../../../components/AddPhotos/AddPhotos'
import { checkListState } from '../../../pages/item/temporary-storage'
import useTempItemQuery from './useTempItemQuery'
import { hashTagState } from '../../../pages/item/addInfo/components/HashTags/HashTag'
import { toast } from 'react-toastify'
import { brandNameSearchState } from '../../../components/BottomSheetModal/ItemBrandSelectModal/ItemBrandSelectModal'
import { linksState } from '../../../pages/item/addLink/components/LinkInput/LinkInput'

const useItemQuery = () => {
  const item = new ItemService()
  const location = useLocation()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const resetS3ImgList = useResetRecoilState(itemS3ImgListState)
  const resetImgListState = useResetRecoilState(imgListState)
  const resetCelebInfoInItem = useResetRecoilState(createItemCelebState)
  const resetNewCeleb = useResetRecoilState(createItemNewCelebState)
  const resetWhenDiscovery = useResetRecoilState(createItemWhenDateState)
  const resetwhereDiscovery = useResetRecoilState(createItemPlaceState)
  const resetCategory = useResetRecoilState(createItemCategoryState)
  const resetBrand = useResetRecoilState(createItemBrandState)
  const resetNewBrand = useResetRecoilState(createItemNewBrandState)
  const resetItemName = useResetRecoilState(createItemNameState)
  const resetPrice = useResetRecoilState(createItemPriceState)
  const resetAdditionalInfo = useResetRecoilState(createItemAddInfoState)
  const resetHashTags = useResetRecoilState(hashTagState)
  const resetSource = useResetRecoilState(createItemSourceState)
  const resetLinkList = useResetRecoilState(createItemLinkState)
  const resetBrandSearch = useResetRecoilState(brandNameSearchState)
  const resetLinks = useResetRecoilState(linksState)
  const [currentTempId, setCurrentTempId] = useRecoilState(currentTempIdState)

  const {
    deleteTempItem: { mutate: mutateItemDeleted },
  } = useTempItemQuery()

  const postItem = useMutation((itemReq: TempItemReq) => item.postItem(itemReq), {
    onSuccess: (res) => {
      console.log(res)
      if (res?.itemId) {
        queryClient.invalidateQueries()
        navigate(`/item/detail/${res.itemId}`, { replace: true })
        resetS3ImgList()
        resetImgListState()
        resetCelebInfoInItem()
        resetNewCeleb()
        resetWhenDiscovery()
        resetwhereDiscovery()
        resetCategory()
        resetBrand()
        resetNewBrand()
        resetItemName()
        resetPrice()
        resetAdditionalInfo()
        resetHashTags()
        resetSource()
        resetLinkList()
        resetBrandSearch()
        resetLinks()
        if (currentTempId) mutateItemDeleted([currentTempId])
        if (location.pathname.includes('edit')) {
          toast('게시글이 수정되었어요')
        } else {
          localStorage.removeItem(localStorageKeys.TEMP_ITEM_ID)
          setCurrentTempId(null)
        }
      }
    },
  })
  return { postItem }
}

export default useItemQuery
