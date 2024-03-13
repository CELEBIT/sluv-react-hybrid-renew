import { useRecoilValue } from 'recoil'
import { celebInfoInItemState, itemInfoState } from '../recoil/itemInfo'
import { useEffect, useMemo } from 'react'
import { useDebounce } from 'use-debounce'
import useTempItemQuery from '../apis/item/hooks/useTempItemQuery'
import { TempItemReq } from '../apis/item/itemService.type'
import { localStorageKeys } from '../config/localStorageKeys'
import { imgListState } from '../components/AddPhotos/AddPhotos'
import useItemImgUpload from '../apis/s3/hooks/useItemImgUpload'
import { useLocation } from 'react-router-dom'

const useUploadStateObserver = () => {
  const {
    postTempItem: { mutate: mutateByTempItem },
  } = useTempItemQuery()
  const {
    postItemImg: { mutate: mutateByImgUpload },
  } = useItemImgUpload()

  const location = useLocation()

  const itemInfo = useRecoilValue(itemInfoState)
  const celebInfo = useRecoilValue(celebInfoInItemState)
  const imgList = useRecoilValue(imgListState)
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
      console.log('item Info all Null')
      return
    } else {
      if (!location.pathname.includes('edit')) {
        console.log('item info in uploadState observer', itemInfo)
        const tempItem: TempItemReq = {
          id: localStorage.getItem('tempItemId')
            ? Number(localStorage.getItem('tempItemId'))
            : null,
          imgList: itemInfo.imgList ?? null,
          celebId: itemInfo.celeb?.celebId ?? null,
          whenDiscovery: itemInfo.whenDiscovery && (itemInfo.whenDiscovery as Date).toISOString(),
          whereDiscovery: itemInfo.whereDiscovery ?? itemInfo.whereDiscovery,
          categoryId: itemInfo.itemCategory?.categoryId ?? null,
          brandId: itemInfo.brand?.brandId ?? null,
          itemName: itemInfo.itemName === '' ? null : itemInfo.itemName,
          price: itemInfo.price ?? null,
          additionalInfo: itemInfo.additionalInfo === '' ? null : itemInfo.additionalInfo,
          hashTagIdList: hashTags,
          linkList: itemInfo.linkList,
          infoSource: itemInfo.infoSource === '' ? null : itemInfo.infoSource,
          newCelebId: itemInfo.newCeleb?.celebId ?? null,
          newBrandId: itemInfo.newBrand?.brandId ?? null,
        }
        console.log('tempItem', tempItem)
        mutateByTempItem(tempItem)

        console.log('Recoil 상태 변화 감지')
      }
    }
  }, [debounceItemInfo, debounceCelebInfo])

  useEffect(() => {
    if (imgList.length > 0) {
      console.log('mutate in img Upload', imgList)
      mutateByImgUpload(imgList)
    }
  }, [imgList])
}

export default useUploadStateObserver
