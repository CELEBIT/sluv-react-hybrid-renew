import React from 'react'
import TwoButtonModal from '.'
import { modals } from '../Modals'
import useModals from '../Modals/hooks/useModals'
import { BtnModalContent } from '../Modals/styles'
import useTempItemQuery from '../../apis/item/hooks/useTempItemQuery'
import { localStorageKeys } from '../../config/localStorageKeys'
import {
  IHashTag,
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
} from '../../recoil/itemInfo'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { imgListState } from '../AddPhotos/AddPhotos'
import { parentCategoryState, subCategoryState } from '../BottomSheetModal/ItemCategoryModal'
import { hashTagState } from '../../pages/item/addInfo/components/HashTags/HashTag'

const AskRecentPostWritingModal = () => {
  const { closeModal } = useModals()
  // temp 아이템 불러오기
  const { getTempItem } = useTempItemQuery()
  const { data } = getTempItem()
  const tempData = data?.pages[0].content[0]

  const setCurrentTempId = useSetRecoilState(currentTempIdState)

  // Item 이미지 리스트
  const setImgList = useSetRecoilState(imgListState)
  // Celeb ID
  const setCelebInfoInItem = useSetRecoilState(createItemCelebState)
  // NewCeleb ID
  const setNewCeleb = useSetRecoilState(createItemNewCelebState)
  // 착용 날짜
  const setWhenDiscovery = useSetRecoilState(createItemWhenDateState)
  // 착용 장소
  const setWhereDiscovery = useSetRecoilState(createItemPlaceState)
  // 아이템 카테고리
  const setCategory = useSetRecoilState(createItemCategoryState)
  // 브랜드 ID
  const setBrand = useSetRecoilState(createItemBrandState)
  // NewBrand ID
  const setNewBrand = useSetRecoilState(createItemNewBrandState)
  // 아이템 이름
  const setItemName = useSetRecoilState(createItemNameState)
  // 가격
  const setPrice = useSetRecoilState(createItemPriceState)
  // 추가정보
  const setAdditionalInfo = useSetRecoilState(createItemAddInfoState)
  const setHashTags = useSetRecoilState(hashTagState)
  const setSource = useSetRecoilState(createItemSourceState)
  // 구매링크
  const setLinkList = useSetRecoilState(createItemLinkState)

  const handleNewWriting = () => {
    localStorage.removeItem(localStorageKeys.TEMP_ITEM_ID)
    closeModal(modals.AskRecentPostWritingModal)
  }

  const handleContinueWriting = () => {
    if (!tempData) {
      return
    }

    closeModal(modals.AskRecentPostWritingModal, () => {
      localStorage.setItem(localStorageKeys.TEMP_ITEM_ID, String(tempData.id))
      setCurrentTempId(tempData.id)
      // 사진 설정
      setImgList(tempData.imgList ?? [])
      // 셀럽 설정
      setCelebInfoInItem({
        groupId: tempData.celeb.parentId !== null ? tempData.celeb.parentId : null,
        groupName:
          tempData.celeb.parentCelebNameKr !== null ? tempData.celeb.parentCelebNameKr : null,
        soloId: tempData.celeb.id !== null ? tempData.celeb.id : null,
        soloName: tempData.celeb.celebNameKr !== null ? tempData.celeb.celebNameKr : null,
      })
      setNewCeleb(
        tempData.newCeleb && {
          id: tempData.newCeleb.newCelebId,
          newCelebName: tempData.newCeleb.newCelebName,
        },
      )
      setWhenDiscovery(tempData.whenDiscovery ? new Date(tempData.whenDiscovery) : null)
      setWhereDiscovery(tempData.whereDiscovery)
      setCategory(
        tempData.category && {
          categoryId: tempData.category.id,
          childName: tempData.category.name,
          parentCategoryId: tempData.category.parentId,
          parentName: tempData.category.parentName,
        },
      )
      setBrand(
        tempData.brand && {
          brandId: tempData.brand.id,
          brandName: tempData.brand.brandKr,
          brandImgUrl: tempData.brand.brandImgUrl,
        },
      )
      setNewBrand(
        tempData.newBrand && {
          brandId: tempData.newBrand.newBrandId,
          brandName: tempData.newBrand.newBrandName,
        },
      )
      setItemName(tempData.itemName)
      setPrice(tempData.price)
      setAdditionalInfo(tempData.additionalInfo)
      setLinkList(tempData.linkList ? tempData.linkList : null)
      setSource(tempData.infoSource)
      // 해시태그 설정
      const hashtags: Array<IHashTag> = []
      tempData.hashTagList &&
        tempData.hashTagList.length > 0 &&
        tempData.hashTagList.map((item) => {
          hashtags.push({
            hashtagId: item.hashtagId,
            hashtagContent: item.hashtagContent,
          })
        })
      setHashTags(hashtags)
    })
  }

  return (
    <TwoButtonModal
      leftButtonName='새로 쓰기'
      rightButtonName='이어 쓰기'
      leftButtonOnClick={handleNewWriting}
      rightButtonOnClick={handleContinueWriting}
    >
      <BtnModalContent>
        최근에 작성하던 글이 있어요! <br />
        이어서 쓰실 건가요?
      </BtnModalContent>
    </TwoButtonModal>
  )
}

export default AskRecentPostWritingModal
