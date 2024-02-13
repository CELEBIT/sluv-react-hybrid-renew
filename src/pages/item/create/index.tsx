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
import { ReactComponent as StorageOff } from '../../../assets/storage_off_20.svg'
import { HeaderWrapper } from '../addInfo/styles'
import { ErrorText } from '../../../components/TextField/DefaultTextfield/styles'
import { selectedSubCategoryState } from '../../../components/BottomSheetModal/ItemCategoryModal'
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

const ItemCreate = () => {
  useUploadStateObserver()

  const { openModal } = useModals()
  const navigate = useNavigate()
  const location = useLocation()
  const [celeb, setCeleb] = useRecoilState(selectedCelebState)
  const [category, setCategory] = useRecoilState(selectedSubCategoryState)
  const links = useRecoilValue(linksState)
  const [itemInfo, setItemInfo] = useRecoilState(itemInfoState)
  const resetItemInfo = useResetRecoilState(itemInfoState)
  const [hasTriedToUpload, setHasTriedToUpload] = useState(false)
  const [imgList, setImgListState] = useRecoilState(imgListState)

  // 아이템 수정용
  const { id: itemId } = useParams()
  const { getItemDetail } = useItemDetailQuery()
  const { data } = getItemDetail(Number(itemId))
  const setCelebInfoInItem = useSetRecoilState(celebInfoInItemState)
  const resetCelebInfoInItem = useResetRecoilState(celebInfoInItemState)

  useEffect(() => {
    const newImgList: ImgResult[] = imgList.map((img: Image, idx) => ({
      imgUrl: img.imgUrl ? img.imgUrl : '',
      representFlag: idx === 0,
      sortOrder: idx,
    }))

    setItemInfo({ ...itemInfo, imgList: newImgList })
  }, [imgList])

  console.log('imgList', imgList)
  useEffect(() => {
    if (location.pathname.includes('/edit/') && data) {
      const {
        imgList,
        whenDiscovery,
        whereDiscovery,
        category,
        itemName,
        brand,
        price,
        color,
        additionalInfo,
        hashTagList,
        linkList,
        infoSource,
        newBrandName,
        celeb,
      } = data
      setImgListState(imgList)
      setCeleb({ id: celeb.id, celebNameKr: celeb.celebTotalNameKr })
      setCelebInfoInItem({
        soloId: celeb.id,
        soloName: celeb.celebChildNameKr,
        groupId: celeb.parentId,
        groupName: celeb.celebParentNameKr,
      })
      const editItemCategory: ICategory | null = {
        categoryId: category.id,
        childName: category.name,
        parentCategoryId: category.parentId,
        parentName: category.parentName,
      }
      setCategory({ id: category.id, name: category.name })
      const editHashTagList: Array<IHashTag> | null = hashTagList.map((tag: HashTagResult) => ({
        hashtagId: tag.id,
        hashtagContent: tag.hashtagContent,
      }))
      const newState: IItemInfo = {
        id: Number(itemId),
        imgList: itemInfo.imgList ?? imgList,
        whenDiscovery: new Date(whenDiscovery),
        whereDiscovery,
        itemCategory: editItemCategory,
        brand: {
          brandId: brand.id,
          brandName: brand.brandKr,
          brandImgUrl: brand.brandImgUrl,
        },
        celeb: {
          celebId: celeb.id,
          celebName: celeb.celebTotalNameKr,
        },
        itemName: itemName,
        price: price,
        color,
        additionalInfo: additionalInfo ? additionalInfo : itemInfo.additionalInfo,
        hashTagList: editHashTagList.length > 0 ? editHashTagList : itemInfo.hashTagList,
        linkList: itemInfo.linkList ? itemInfo.linkList : linkList,
        infoSource,
        newBrand: { brandName: newBrandName },
      }
      console.log('newState imgList', newState.imgList)
      setItemInfo(newState)
    }
  }, [data, location.pathname, setItemInfo])

  console.log('itemInfo', itemInfo)
  useEffect(() => {
    const id = localStorage.getItem(localStorageKeys.TEMP_ITEM_ID)
    if (location.pathname.includes('/edit/') === false) {
      if (id) {
        openModal(modals.AskRecentPostWritingModal)
      }
      if (hasTriedToUpload === true) {
        localStorage.removeItem(localStorageKeys.TEMP_ITEM_ID)
      }
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
        hashTagList: hashTags,
        linkList: itemInfo.linkList,
        infoSource: itemInfo.infoSource === '' ? null : itemInfo.infoSource,
        newCelebId: itemInfo.newCeleb?.celebId ?? null,
        newBrandId: itemInfo.newBrand?.brandId ?? null,
      }
      mutate(item)
    } else {
      alert('오류가 발생했어요. 다시 시도해주세요')
    }
  }

  const onBackClick = () => {
    resetItemInfo()
    resetCelebInfoInItem()
    navigate('/', { replace: true })
  }

  return (
    <ItemCreatePageStyle>
      <HeaderWrapper>
        <Header
          isModalHeader={false}
          title='정보 공유하기'
          hasArrow={true}
          backBtnClick={onBackClick}
        >
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
                !itemInfo.brand ||
                !itemInfo.newBrand ||
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
            <InfoAddOff></InfoAddOff>
            <span>추가 정보</span>
          </div>
          <div className='button' onClick={() => navigate('/item/create/addlink')}>
            <LinkAddOff></LinkAddOff>
            <span>구매 링크</span>
          </div>
        </div>
        <div className='right'>
          <StorageOff onClick={() => navigate('/item/create/temporary-storage')}></StorageOff>
        </div>
      </BottomBar>
    </ItemCreatePageStyle>
  )
}

export default ItemCreate
