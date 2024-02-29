import React from 'react'
import TwoButtonModal from '.'
import { modals } from '../Modals'
import useModals from '../Modals/hooks/useModals'
import { BtnModalContent } from '../Modals/styles'
import useTempItemQuery from '../../apis/item/hooks/useTempItemQuery'
import { localStorageKeys } from '../../config/localStorageKeys'
import { IHashTag, celebInfoInItemState, itemInfoState } from '../../recoil/itemInfo'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { imgListState } from '../AddPhotos/AddPhotos'
import { parentCategoryState, subCategoryState } from '../BottomSheetModal/ItemCategoryModal'
import { hashTagState } from '../../pages/item/addInfo/components/HashTags/HashTag'

const AskRecentPostWritingModal = () => {
  const { closeModal } = useModals()
  const { getTempItem } = useTempItemQuery()
  const { data } = getTempItem()
  const tempData = data?.pages[0].content[0]

  const [itemInfo, setItemInfo] = useRecoilState(itemInfoState)
  const setCelebInfoInItem = useSetRecoilState(celebInfoInItemState)
  const setImgListState = useSetRecoilState(imgListState)
  const setSubCategory = useSetRecoilState(subCategoryState)
  const setParentCategory = useSetRecoilState(parentCategoryState)
  const setHashTags = useSetRecoilState(hashTagState)

  const handleNewWriting = () => {
    localStorage.removeItem(localStorageKeys.TEMP_ITEM_ID)
    closeModal(modals.AskRecentPostWritingModal)
  }

  const handleContinueWriting = () => {
    if (!tempData) {
      return
    }
    localStorage.setItem(localStorageKeys.TEMP_ITEM_ID, String(tempData.id))
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
    // 카테고리 설정
    if (tempData.category) {
      if (tempData.category.parentId && tempData.category.parentName) {
        setParentCategory({ id: tempData.category.parentId, name: tempData.category.parentName })
      }
      if (tempData.category.id && tempData.category.name) {
        setSubCategory({ id: tempData.category.id, name: tempData.category.name })
      }
    }
    // 사진 설정
    setImgListState(tempData.imgList ?? [])
    // 셀럽 설정
    if (tempData.celeb) {
      setCelebInfoInItem((prevState) => ({
        ...prevState,
        groupId: tempData.celeb.parentId !== null ? tempData.celeb.parentId : null,
        groupName:
          tempData.celeb.parentCelebNameKr !== null ? tempData.celeb.parentCelebNameKr : null,
        soloId: tempData.celeb.id !== null ? tempData.celeb.id : null,
        soloName: tempData.celeb.celebNameKr !== null ? tempData.celeb.celebNameKr : null,
      }))
    }

    setItemInfo({
      ...itemInfo,
      imgList: tempData.imgList ?? null,
      celeb: tempData.celeb && {
        celebId: tempData.celeb.id,
        celebName: tempData.celeb.celebNameEn,
      },
      whenDiscovery: tempData.whenDiscovery ? new Date(tempData.whenDiscovery) : null,
      whereDiscovery: tempData.whereDiscovery,
      itemCategory: tempData.category && {
        categoryId: tempData.category.id,
        childName: tempData.category.name,
        parentCategoryId: tempData.category.parentId,
        parentName: tempData.category.parentName,
      },
      brand: tempData.brand && {
        brandId: tempData.brand.id,
        brandName: tempData.brand.brandKr,
        brandImgUrl: tempData.brand.brandImgUrl,
      },
      itemName: tempData.itemName,
      price: tempData.price,
      additionalInfo: tempData.additionalInfo,
      hashTagList: !hashtags ? null : hashtags,
      linkList: tempData.linkList ? tempData.linkList : null,
      infoSource: tempData.infoSource,
      newCeleb: tempData.newCeleb && {
        celebId: tempData.newCeleb.newCelebId,
        celebName: tempData.newCeleb.newCelebName,
      },
      newBrand: tempData.newBrand && {
        brandId: tempData.newBrand.newBrandId,
        brandName: tempData.newBrand.newBrandName,
      },
    })
    closeModal(modals.AskRecentPostWritingModal)
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
