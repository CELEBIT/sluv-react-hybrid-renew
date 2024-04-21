import React, { useEffect, useState } from 'react'
import BrandItemField from './components/BrandItemField/BrandItemField'
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import DatePlaceField from './components/DatePlaceField/DatePlaceField'
import PriceField from './components/PriceField/PriceField'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import SelectCeleb, {
  selectedCelebState,
  selectedGroupState,
} from '../../../components/SelectCeleb/SelectCeleb'
import SelectCategory from './components/SelectCategory/SelectCategory'
import Header from '../../../components/Header/Header'
import {
  BottomBar,
  ComponentContainer,
  ComponentWrapper,
  ItemCreatePageStyle,
  Label,
  LabelContainer,
} from './styles'
import { ReactComponent as Error } from '../../../assets/error_20.svg'
import { ReactComponent as LinkAddOff } from '../../../assets/link_add_off_20.svg'
import { ReactComponent as InfoAddOff } from '../../../assets/info_add_off_20.svg'
import { ReactComponent as LinkAddOn } from '../../../assets/link_add_on_20.svg'
import { ReactComponent as InfoAddOn } from '../../../assets/info_add_on_20.svg'
import { ReactComponent as StorageOn } from '../../../assets/storage_on_20.svg'
import { ReactComponent as StorageOff } from '../../../assets/storage_off_20.svg'
import { HeaderWrapper } from '../addInfo/styles'
import { ErrorText } from '../../../components/TextField/DefaultTextfield/styles'
import {
  parentCategoryState,
  subCategoryState,
} from '../../../components/BottomSheetModal/ItemCategoryModal'
import { linksState } from '../addLink/components/LinkInput/LinkInput'
import ImageField from './components/ImageField/ImageField'
import {
  ICategory,
  IHashTag,
  IItemInfo,
  celebInfoInItemState,
  itemInfoState,
} from '../../../recoil/itemInfo'
import useUploadStateObserver from '../../../hooks/useUploadStateObserver'
import { localStorageKeys } from '../../../config/localStorageKeys'
import useModals from '../../../components/Modals/hooks/useModals'
import { modals } from '../../../components/Modals'
import useItemQuery from '../../../apis/item/hooks/useItemQuery'
import { HashTagResult, ImgResult, TempItemReq } from '../../../apis/item/itemService.type'
import useItemDetailQuery from '../../../apis/item/hooks/useItemDetailQuery'
import { Image, imgListState } from '../../../components/AddPhotos/AddPhotos'
import useTempItemQuery from '../../../apis/item/hooks/useTempItemQuery'

const ItemCreate = () => {
  useUploadStateObserver()

  const { openModal } = useModals()
  const navigate = useNavigate()
  const celeb = useRecoilValue(selectedCelebState)
  const category = useRecoilValue(subCategoryState)
  const [itemInfo, setItemInfo] = useRecoilState(itemInfoState)
  const resetItemInfo = useResetRecoilState(itemInfoState)
  const [hasTriedToUpload, setHasTriedToUpload] = useState(false)
  const imgList = useRecoilValue(imgListState)
  const setImgList = useSetRecoilState(imgListState)

  const resetCelebInfoInItem = useResetRecoilState(celebInfoInItemState)

  const { getTempItem } = useTempItemQuery()
  const { data } = getTempItem()

  useEffect(() => {
    console.log('imgList')
    const newImgList: ImgResult[] = imgList.map((img: Image, idx) => ({
      imgUrl: img.imgUrl ? img.imgUrl : '',
      representFlag: idx === 0,
      sortOrder: idx,
    }))
    if (imgList.length > 0) setItemInfo({ ...itemInfo, imgList: newImgList })
  }, [imgList])

  useEffect(() => {
    const id = localStorage.getItem(localStorageKeys.TEMP_ITEM_ID)
    if (id) {
      openModal(modals.AskRecentPostWritingModal)
    }
    if (hasTriedToUpload === true) {
      localStorage.removeItem(localStorageKeys.TEMP_ITEM_ID)
    }
  }, [])

  const {
    postItem: { mutate },
  } = useItemQuery()

  const onSubmit = () => {
    setHasTriedToUpload(true)
    if (
      itemInfo.imgList &&
      (itemInfo.celeb || itemInfo.newCeleb) &&
      itemInfo.itemCategory &&
      (itemInfo.brand?.brandId || itemInfo.newBrand?.brandId) &&
      itemInfo.itemName &&
      itemInfo.price
    ) {
      let hashTags: Array<number> | null = []
      if ((itemInfo.hashTagList?.length ?? 0) > 0) {
        itemInfo?.hashTagList?.map((item) => {
          if (item.hashtagId) hashTags?.push(item.hashtagId)
        })
      } else {
        hashTags = null
      }

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
      const item: TempItemReq = {
        id: itemInfo.id ? itemInfo.id : null,
        imgList: itemInfo.imgList,
        celebId: itemInfo.celeb?.celebId ?? null,
        whenDiscovery: itemInfo.whenDiscovery && (itemInfo.whenDiscovery as Date).toISOString(),
        whereDiscovery: itemInfo.whereDiscovery === '' ? null : itemInfo.whereDiscovery,
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
      mutate(item)
    }
  }

  const resetCategory = useResetRecoilState(subCategoryState)
  const resetParentCategory = useResetRecoilState(parentCategoryState)
  const resetImgListState = useResetRecoilState(imgListState)

  const onBackClick = () => {
    resetItemInfo()
    resetCelebInfoInItem()
    resetCategory()
    resetParentCategory()
    resetImgListState()
    navigate('/home', { replace: true })
  }

  return (
    <ItemCreatePageStyle>
      <HeaderWrapper>
        <Header isModalHeader={false} title='정보 공유' hasArrow={true} backBtnClick={onBackClick}>
          <span className='submit' onClick={onSubmit}>
            등록
          </span>
        </Header>
      </HeaderWrapper>
      <ComponentContainer>
        <ComponentWrapper>
          {/* <ImageField error={false}></ImageField> */}
          <ImageField hasTriedToUpload={hasTriedToUpload}></ImageField>
        </ComponentWrapper>
        <ComponentWrapper>
          <LabelContainer>
            {hasTriedToUpload && !celeb.id && <Error></Error>}
            <Label>누가 착용했나요?</Label>
          </LabelContainer>
          <SelectCeleb></SelectCeleb>
          {hasTriedToUpload && !celeb.id && (
            <ErrorText className='error'>필수 항목입니다</ErrorText>
          )}
        </ComponentWrapper>
        <ComponentWrapper>
          <LabelContainer>
            <Label>언제 어디서 착용했나요?</Label>
          </LabelContainer>
          <DatePlaceField />
        </ComponentWrapper>
        <ComponentWrapper>
          <LabelContainer>
            {hasTriedToUpload &&
              (!category.id ||
                (itemInfo.brand?.brandId && itemInfo.newBrand) ||
                !itemInfo.itemName ||
                !itemInfo.price) && <Error></Error>}
            <Label>어떤 아이템인가요?</Label>
          </LabelContainer>
          <SelectCategory />
          {hasTriedToUpload && !category.id && (
            <ErrorText className='error'>필수 항목입니다</ErrorText>
          )}
          <ComponentWrapper className='padding'>
            <BrandItemField
              brandValid={hasTriedToUpload ? !itemInfo.brand || !itemInfo.newBrand : true}
              itemNameValid={hasTriedToUpload ? itemInfo.itemName !== '' : true}
            ></BrandItemField>
          </ComponentWrapper>
          {(itemInfo.brand?.brandId || itemInfo.newBrand?.brandId) && (
            <>
              <PriceField></PriceField>
              {hasTriedToUpload && !itemInfo.price && (
                <ErrorText className='error'>필수 항목입니다</ErrorText>
              )}
            </>
          )}
        </ComponentWrapper>
      </ComponentContainer>

      <BottomBar>
        <div className='left'>
          <div className='button' onClick={() => navigate('/item/create/addInfo')}>
            {(itemInfo.additionalInfo && itemInfo.additionalInfo?.length > 0) ||
            (itemInfo.hashTagList && itemInfo.hashTagList.length > 0) ? (
              <InfoAddOn></InfoAddOn>
            ) : (
              <InfoAddOff></InfoAddOff>
            )}

            <span>추가 정보</span>
          </div>
          <div className='button' onClick={() => navigate('/item/create/addlink')}>
            {itemInfo.linkList && itemInfo.linkList.length > 0 ? (
              <LinkAddOn></LinkAddOn>
            ) : (
              <LinkAddOff></LinkAddOff>
            )}
            <span>구매 링크</span>
          </div>
        </div>
        <div className='right'>
          {data?.pages[0].countNum && data?.pages[0].countNum > 0 ? (
            <StorageOn onClick={() => navigate('/item/create/temporary-storage')}></StorageOn>
          ) : (
            <StorageOff onClick={() => navigate('/item/create/temporary-storage')}></StorageOff>
          )}
        </div>
      </BottomBar>
    </ItemCreatePageStyle>
  )
}

export default ItemCreate
