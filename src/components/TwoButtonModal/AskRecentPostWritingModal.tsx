import React from 'react'
import TwoButtonModal from '.'
import { modals } from '../Modals'
import useModals from '../Modals/hooks/useModals'
import { BtnModalContent } from '../Modals/styles'
import useTempItemQuery from '../../apis/item/hooks/useTempItemQuery'
import { localStorageKeys } from '../../config/localStorageKeys'
import { IHashTag, itemInfoState } from '../../recoil/itemInfo'
import { useRecoilState } from 'recoil'

const AskRecentPostWritingModal = () => {
  const { closeModal } = useModals()
  const { getTempItem } = useTempItemQuery()
  const { data } = getTempItem()
  const tempData = data?.pages[0].content[0]

  const [itemInfo, setItemInfo] = useRecoilState(itemInfoState)

  const handleNewWriting = () => {
    localStorage.removeItem(localStorageKeys.TEMP_ITEM_ID)
    closeModal(modals.AskRecentPostWritingModal)
  }

  const handleContinueWriting = () => {
    if (!tempData) {
      return
    }
    localStorage.setItem(localStorageKeys.TEMP_ITEM_ID, String(tempData.id))
    const hashtags: Array<IHashTag> = []
    tempData.hashTagList.length > 0 &&
      tempData.hashTagList.map((item) => {
        hashtags.push({
          hashtagId: item.id,
          hashtagContent: item.hashtagContent,
        })
      })
    setItemInfo({
      ...itemInfo,
      imgList: tempData.imgList.length === 0 ? null : tempData.imgList,
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
      hashTagList: hashtags.length === 0 ? null : hashtags,
      linkList: tempData.linkList.length === 0 ? null : tempData.linkList,
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
