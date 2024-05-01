import { useRecoilState, useRecoilValue } from 'recoil'
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
  tempS3ImgListState,
} from '../recoil/itemInfo'
import { useEffect, useMemo } from 'react'
import useTempItemQuery from '../apis/item/hooks/useTempItemQuery'
import { TempItemReq } from '../apis/item/itemService.type'
import useItemImgUpload from '../apis/s3/hooks/useItemImgUpload'
import { useLocation } from 'react-router-dom'
import { imgListState } from '../components/AddPhotos/AddPhotos'
import { hashTagState } from '../pages/item/addInfo/components/HashTags/HashTag'
import { useDebounce } from 'use-debounce'

const useUploadStateObserver = () => {
  const {
    postTempItem: { mutate: mutateByTempItem },
  } = useTempItemQuery()
  const {
    postTempItemImg: { mutate: mutateByTempImgUpload },
  } = useItemImgUpload()

  const location = useLocation()

  // Item 이미지 리스트
  const imgList = useRecoilValue(imgListState)
  const [debouncedImgList] = useDebounce(imgList, 500)
  const tempS3ImgList = useRecoilValue(tempS3ImgListState)
  const [debouncedTempS3ImgList] = useDebounce(tempS3ImgList, 500)

  // Celeb ID
  const celebInfoInItem = useRecoilValue(createItemCelebState)
  const [debouncedCelebInfoInItem] = useDebounce(celebInfoInItem, 500)
  // NewCeleb ID
  const newCeleb = useRecoilValue(createItemNewCelebState)
  const [debouncedNewCeleb] = useDebounce(newCeleb, 500)

  // 착용 날짜
  const whenDiscovery = useRecoilValue(createItemWhenDateState)
  const [debouncedWhenDiscovery] = useDebounce(whenDiscovery, 500)

  // 착용 장소
  const whereDiscovery = useRecoilValue(createItemPlaceState)
  const [debouncedWhereDiscovery] = useDebounce(whereDiscovery, 500)

  // 아이템 카테고리
  const category = useRecoilValue(createItemCategoryState)
  const [debouncedCategory] = useDebounce(category, 500)

  // 브랜드 ID
  const brand = useRecoilValue(createItemBrandState)
  const [debouncedBrand] = useDebounce(brand, 500)

  // NewBrand ID
  const newBrand = useRecoilValue(createItemNewBrandState)
  const [debouncedNewbrand] = useDebounce(newBrand, 500)

  // 아이템 이름
  const itemName = useRecoilValue(createItemNameState)
  const [debouncedItemName] = useDebounce(itemName, 500)

  // 가격
  const price = useRecoilValue(createItemPriceState)
  const [debouncedPrice] = useDebounce(price, 500)

  // 추가정보
  const additionalInfo = useRecoilValue(createItemAddInfoState)
  const [debouncedAdditionalInfo] = useDebounce(additionalInfo, 500)

  const hashTags = useRecoilValue(hashTagState)
  const [debouncedHashTags] = useDebounce(hashTags, 500)

  const source = useRecoilValue(createItemSourceState)
  const [debouncedSource] = useDebounce(source, 500)

  // 구매링크
  const linkList = useRecoilValue(createItemLinkState)
  const [debouncedinkList] = useDebounce(linkList, 500)

  // const hashTags = useMemo(() => {
  //   const temp: Array<number> = []
  //   if ((hashTagList?.length ?? 0) < 1) {
  //     return null
  //   }
  //   itemInfo?.hashTagList?.map((item) => {
  //     temp.push(item.hashtagId)
  //   })
  //   return temp
  // }, [hashTagList])

  useEffect(() => {
    if (imgList?.length > 0) {
      mutateByTempImgUpload(imgList)
    }
  }, [imgList])

  useEffect(() => {
    const hashTagIdList: Array<number> | null =
      hashTags && hashTags.length > 0 ? hashTags.map((item) => item.hashtagId) : null
    if (
      !(
        (imgList && imgList.length) ||
        celebInfoInItem ||
        whenDiscovery ||
        whereDiscovery ||
        category ||
        brand ||
        itemName ||
        price ||
        additionalInfo ||
        hashTagIdList ||
        linkList ||
        source ||
        newCeleb ||
        newBrand
      )
    ) {
      console.log('item Info all Null')
      return
    } else {
      if (!location.pathname.includes('edit')) {
        const tempItem: TempItemReq = {
          id: localStorage.getItem('tempItemId')
            ? Number(localStorage.getItem('tempItemId'))
            : null,
          imgList: debouncedTempS3ImgList ?? null,
          celebId: celebInfoInItem?.soloId ?? null,
          whenDiscovery: whenDiscovery ? (whenDiscovery as Date).toISOString() : null,
          whereDiscovery: whereDiscovery ?? whereDiscovery,
          categoryId: category?.categoryId ?? null,
          brandId: brand?.brandId ?? null,
          itemName: itemName ?? null,
          price: price ?? null,
          additionalInfo: additionalInfo ?? null,
          hashTagIdList: hashTagIdList ?? null,
          linkList: linkList,
          infoSource: source ?? null,
          newCelebId: newCeleb?.id ?? null,
          newBrandId: newBrand?.brandId ?? null,
        }
        console.log('tempItem post 전 item', tempItem)
        mutateByTempItem(tempItem)

        // console.log('Recoil 상태 변화 감지')
        // console.log(tempItem)
      }
    }
  }, [
    debouncedTempS3ImgList,
    debouncedCelebInfoInItem,
    debouncedNewCeleb,
    debouncedWhenDiscovery,
    debouncedWhereDiscovery,
    debouncedCategory,
    debouncedBrand,
    debouncedNewbrand,
    debouncedItemName,
    debouncedPrice,
    debouncedAdditionalInfo,
    debouncedHashTags,
    debouncedSource,
    debouncedinkList,
  ])
}

export default useUploadStateObserver
