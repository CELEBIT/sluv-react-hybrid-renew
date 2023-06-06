import { useRecoilValue } from 'recoil'
import { celebInfoInItemState, itemInfoState } from '../recoil/itemInfo'
import { useEffect, useMemo } from 'react'
import { useDebounce } from 'use-debounce'
import useTempItemQuery from '../apis/item/hooks/useTempItemQuery'
import { TempItemReq } from '../apis/item/itemService.type'
import { localStorageKeys } from '../config/localStorageKeys'

const useUploadStateObserver = () => {
  const {
    postTempItem: { mutate },
  } = useTempItemQuery()

  const itemInfo = useRecoilValue(itemInfoState)
  const celebInfo = useRecoilValue(celebInfoInItemState)
  const [debounceItemInfo] = useDebounce(itemInfo, 500)
  const [debounceCelebInfo] = useDebounce(celebInfo, 500)

  const hashTags = useMemo(() => {
    const temp: Array<number> = []
    if ((itemInfo.hashTagList?.length ?? 0) < 1) {
      return null
    }
    itemInfo?.hashTagList?.map((item) => {
      temp.push(item.hashtagId)
    })
    return temp
  }, [itemInfo.hashTagList])

  useEffect(() => {
    if (
      !(
        itemInfo.imgList ||
        itemInfo.celeb ||
        itemInfo.whenDiscovery ||
        itemInfo.whereDiscovery ||
        itemInfo.itemCategory ||
        itemInfo.brand ||
        itemInfo.itemName ||
        itemInfo.price ||
        itemInfo.additionalInfo ||
        itemInfo.hashTagList ||
        itemInfo.linkList ||
        itemInfo.infoSource ||
        itemInfo.newCeleb ||
        itemInfo.newBrand
      )
    ) {
      return
    }
    const tempItem: TempItemReq = {
      id: localStorage.getItem('tempItemId') ? Number(localStorage.getItem('tempItemId')) : null,
      imgList: itemInfo.imgList,
      celebId: itemInfo.celeb?.celebId ?? null,
      whenDiscovery: itemInfo.whenDiscovery && (itemInfo.whenDiscovery as Date).toISOString(),
      whereDiscovery: itemInfo.whereDiscovery === '' ? null : itemInfo.whereDiscovery,
      categoryId: itemInfo.itemCategory?.categoryId ?? null,
      brandId: itemInfo.brand?.brandId ?? null,
      itemName: itemInfo.itemName === '' ? null : itemInfo.itemName,
      price: itemInfo.price ?? null,
      additionalInfo: itemInfo.additionalInfo === '' ? null : itemInfo.additionalInfo,
      hashTagList: hashTags,
      linkList: itemInfo.linkList,
      infoSource: itemInfo.infoSource === '' ? null : itemInfo.infoSource,
      newCelebId: itemInfo.newCeleb?.celebId ?? null,
      newBrandId: itemInfo.newBrand?.brandId ?? null,
    }
    mutate(tempItem)

    console.log('Recoil 상태 변화 감지')
  }, [debounceItemInfo, debounceCelebInfo])
}

export default useUploadStateObserver
