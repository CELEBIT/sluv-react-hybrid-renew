import React, { useEffect, useLayoutEffect, useState } from 'react'
import BrandItemField from './components/BrandItemField/BrandItemField'
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import DatePlaceField from './components/DatePlaceField/DatePlaceField'
import PriceField from './components/PriceField/PriceField'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import SelectCeleb from '../../../components/SelectCeleb/SelectCeleb'
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
import ImageField from './components/ImageField/ImageField'
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
import useUploadStateObserver from '../../../hooks/useUploadStateObserver'
import { localStorageKeys } from '../../../config/localStorageKeys'
import useModals from '../../../components/Modals/hooks/useModals'
import { modals } from '../../../components/Modals'
import useItemQuery from '../../../apis/item/hooks/useItemQuery'
import { HashTagResult, ImgResult, TempItemReq } from '../../../apis/item/itemService.type'
import useItemDetailQuery from '../../../apis/item/hooks/useItemDetailQuery'
import { imgListState } from '../../../components/AddPhotos/AddPhotos'
import useTempItemQuery from '../../../apis/item/hooks/useTempItemQuery'
import { hashTagState } from '../addInfo/components/HashTags/HashTag'
import useItemImgUpload from '../../../apis/s3/hooks/useItemImgUpload'
import { checkListState } from '../temporary-storage'
import { brandNameSearchState } from '../../../components/BottomSheetModal/ItemBrandSelectModal/ItemBrandSelectModal'
import { linksState } from '../addLink/components/LinkInput/LinkInput'

const ItemCreate = () => {
  useUploadStateObserver()

  const navigate = useNavigate()

  const [hasTriedToUpload, setHasTriedToUpload] = useState<boolean>(false)

  // Item 이미지 리스트
  const imgList = useRecoilValue(imgListState)
  const s3ImgList = useRecoilValue(itemS3ImgListState)
  // Celeb ID
  const celebInfoInItem = useRecoilValue(createItemCelebState)
  // NewCeleb ID
  const newCeleb = useRecoilValue(createItemNewCelebState)
  // 착용 날짜
  const whenDiscovery = useRecoilValue(createItemWhenDateState)
  // 착용 장소
  const whereDiscovery = useRecoilValue(createItemPlaceState)
  // 아이템 카테고리
  const category = useRecoilValue(createItemCategoryState)
  // 브랜드 ID
  const brand = useRecoilValue(createItemBrandState)
  // NewBrand ID
  const newBrand = useRecoilValue(createItemNewBrandState)
  // 아이템 이름
  const itemName = useRecoilValue(createItemNameState)
  // 가격
  const price = useRecoilValue(createItemPriceState)
  // 추가정보
  const additionalInfo = useRecoilValue(createItemAddInfoState)
  const hashTags = useRecoilValue(hashTagState)
  const source = useRecoilValue(createItemSourceState)
  // 구매링크
  const linkList = useRecoilValue(createItemLinkState)
  // 임시저장 아이템
  const [currentTempId, setCurrentTempId] = useRecoilState(currentTempIdState)

  const { openModal } = useModals()
  useEffect(() => {
    console.log('useEffect')
    const id = Number(localStorage.getItem(localStorageKeys.TEMP_ITEM_ID))
    if (id && id !== currentTempId) {
      openModal(modals.AskRecentPostWritingModal)
    }
  }, [])

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

  // const resetCategory = useResetRecoilState(subCategoryState)
  // const resetParentCategory = useResetRecoilState(parentCategoryState)

  const onBackClick = () => {
    setCurrentTempId(null)
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
    navigate('/home', { replace: true })
  }

  const { getTempCount, getTempItem } = useTempItemQuery()
  const { data: tempCount } = getTempCount()

  const {
    postItemImg: { mutate: mutateByImgUpload },
  } = useItemImgUpload()

  const onSubmit = async () => {
    const hashTagIdList: Array<number> | null =
      hashTags && hashTags.length > 0 ? hashTags.map((item) => item.hashtagId) : null
    setHasTriedToUpload(true)
    // 아무 값이 없을 때
    if (
      !(
        imgList ||
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
      return
    } else if (
      imgList &&
      (celebInfoInItem || newCeleb) &&
      category &&
      (brand?.brandId || newBrand?.brandId) &&
      itemName &&
      price
    ) {
      await mutateByImgUpload(imgList)
    }
  }

  const {
    postItem: { mutate },
  } = useItemQuery()

  // s3ImgList의 변화 감지를 위한 useEffect
  useEffect(() => {
    if (s3ImgList && s3ImgList.length > 0) {
      // s3ImgList가 업데이트 되었을 때 실행할 로직
      const hashTagIdList: Array<number> | null =
        hashTags && hashTags.length > 0 ? hashTags.map((item) => item.hashtagId) : null
      const item: TempItemReq = {
        id: null,
        imgList: s3ImgList ?? null,
        celebId: celebInfoInItem?.soloId ?? null,
        whenDiscovery: whenDiscovery && (whenDiscovery as Date).toISOString(),
        whereDiscovery: whereDiscovery === '' ? null : whereDiscovery,
        categoryId: category?.categoryId ?? null,
        brandId: brand?.brandId ?? null,
        itemName: itemName === '' ? null : itemName,
        price: price ?? null,
        additionalInfo: additionalInfo ?? null,
        hashTagIdList: hashTagIdList ?? null,
        linkList: linkList ?? null,
        infoSource: source ?? null,
        newCelebId: newCeleb?.id ?? null,
        newBrandId: newBrand?.brandId ?? null,
      }
      mutate(item)
    }
  }, [s3ImgList])

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
          <ImageField hasTriedToUpload={hasTriedToUpload}></ImageField>
        </ComponentWrapper>
        <ComponentWrapper>
          <LabelContainer>
            {hasTriedToUpload && !(celebInfoInItem?.soloId || newCeleb?.id) && <Error></Error>}
            <Label>누가 착용했나요?</Label>
          </LabelContainer>
          <SelectCeleb></SelectCeleb>
          {hasTriedToUpload && !(celebInfoInItem?.soloId || newCeleb?.id) && (
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
              (!category?.categoryId || !(brand?.brandId || newBrand) || !itemName || !price) && (
                <Error></Error>
              )}
            <Label>어떤 아이템인가요?</Label>
          </LabelContainer>
          <SelectCategory />
          {hasTriedToUpload && !category?.categoryId && (
            <ErrorText className='error'>필수 항목입니다</ErrorText>
          )}
          <ComponentWrapper className='padding'>
            <BrandItemField
              brandValid={hasTriedToUpload ? !(!brand && !newBrand) : true}
              itemNameValid={hasTriedToUpload ? itemName === '' && itemName === null : true}
            ></BrandItemField>
          </ComponentWrapper>
          {(brand?.brandId || newBrand?.brandId) && (
            <>
              <PriceField></PriceField>
              {hasTriedToUpload && !price && (
                <ErrorText className='error'>필수 항목입니다</ErrorText>
              )}
            </>
          )}
        </ComponentWrapper>
      </ComponentContainer>

      <BottomBar>
        <div className='left'>
          <div className='button' onClick={() => navigate('/item/create/addInfo')}>
            {(additionalInfo && additionalInfo?.length > 0) || (hashTags && hashTags.length > 0) ? (
              <InfoAddOn></InfoAddOn>
            ) : (
              <InfoAddOff></InfoAddOff>
            )}

            <span>추가 정보</span>
          </div>
          <div className='button' onClick={() => navigate('/item/create/addlink')}>
            {linkList && linkList.length > 0 ? <LinkAddOn></LinkAddOn> : <LinkAddOff></LinkAddOff>}
            <span>구매 링크</span>
          </div>
        </div>
        <div className='right'>
          {tempCount && tempCount?.tempItemCount > 0 ? (
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
