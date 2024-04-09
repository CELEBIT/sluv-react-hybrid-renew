import React, { useEffect, useState } from 'react'
import BrandItemField from '../create/components/BrandItemField/BrandItemField'
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import DatePlaceField from '../create/components/DatePlaceField/DatePlaceField'
import PriceField from '../create/components/PriceField/PriceField'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import {
  BottomBar,
  ComponentContainer,
  ComponentWrapper,
  ItemCreatePageStyle,
  Label,
  LabelContainer,
} from '../create/styles'
import { ReactComponent as Error } from '../../../assets/error_20.svg'
import { ReactComponent as LinkAddOff } from '../../../assets/link_add_off_20.svg'
import { ReactComponent as InfoAddOff } from '../../../assets/info_add_off_20.svg'
import { ReactComponent as StorageOff } from '../../../assets/storage_off_20.svg'
import { ReactComponent as LinkAddOn } from '../../../assets/link_add_on_20.svg'
import { ReactComponent as InfoAddOn } from '../../../assets/info_add_on_20.svg'
import { ReactComponent as StorageOn } from '../../../assets/storage_on_20.svg'
import { HeaderWrapper } from '../addInfo/styles'
import { ErrorText } from '../../../components/TextField/DefaultTextfield/styles'
import {
  parentCategoryState,
  subCategoryState,
} from '../../../components/BottomSheetModal/ItemCategoryModal'
import ImageField from '../create/components/ImageField/ImageField'
import {
  ICategory,
  IHashTag,
  IItemInfo,
  celebInfoInItemState,
  itemInfoState,
} from '../../../recoil/itemInfo'
import useModals from '../../../components/Modals/hooks/useModals'
import useItemQuery from '../../../apis/item/hooks/useItemQuery'
import { HashTagResult, ImgResult, TempItemReq } from '../../../apis/item/itemService.type'
import useItemDetailQuery from '../../../apis/item/hooks/useItemDetailQuery'
import { Image, imgListState } from '../../../components/AddPhotos/AddPhotos'
import { selectedCelebState } from '../../../components/SelectCeleb/SelectCeleb'
import Header from '../../../components/Header/Header'
import SelectCategory from '../create/components/SelectCategory/SelectCategory'
import ButtonMedium from '../../../components/ButtonMedium/ButtonMedium'
import { CelebWrapper } from './styles'
import { hashTagState } from '../addInfo/components/HashTags/HashTag'

const ItemEdit = () => {
  const { openModal } = useModals()
  const navigate = useNavigate()
  const [celeb, setCeleb] = useRecoilState(selectedCelebState)

  const [category, setCategory] = useRecoilState(subCategoryState)
  const [parentCategory, setParentCategory] = useRecoilState(parentCategoryState)

  const [hasTriedToUpload, setHasTriedToUpload] = useState(false)
  const [imgList, setImgListState] = useRecoilState(imgListState)
  const hashTag = useRecoilValue(hashTagState)

  const { id: itemId } = useParams()
  const { getItemDetail } = useItemDetailQuery()

  // 1. 아이템 정보 불러오기
  const [itemInfo, setItemInfo] = useRecoilState(itemInfoState)
  const { data } = getItemDetail(Number(itemId))

  useEffect(() => {
    if (data) {
      // 사진
      setImgListState(data.imgList)

      // 셀럽
      setCeleb({ id: data.celeb.id, celebNameKr: data.celeb.celebTotalNameKr })
      setCelebInfoInItem({
        soloId: data.celeb.id,
        soloName: data.celeb.celebChildNameKr,
        groupId: data.celeb.parentId,
        groupName: data.celeb.celebParentNameKr,
      })

      // 카테고리
      // parent category
      setParentCategory({ id: data.category.parentId, name: data.category.parentName })
      // sub category
      setCategory({
        id: data.category.id,
        name: data.category.name,
      })
      // itemInfo 저장용 Category
      const editItemCategory: ICategory | null = {
        categoryId: data.category.id,
        childName: data.category.name,
        parentCategoryId: data.category.parentId,
        parentName: data.category.parentName,
      }

      // itemInfo 저장용 Hashtag
      const editHashTagList: Array<IHashTag> | null = data.hashTagList.map(
        (tag: HashTagResult) => ({
          hashtagId: tag.hashtagId,
          hashtagContent: tag.hashtagContent,
        }),
      )
      const newState: IItemInfo = {
        id: Number(itemId),
        imgList: itemInfo.imgList ?? data.imgList,
        whenDiscovery: new Date(data.whenDiscovery),
        whereDiscovery: data.whereDiscovery,
        itemCategory: editItemCategory,
        brand: {
          brandId: data.brand.id,
          brandName: data.brand.brandKr,
          brandImgUrl: data.brand.brandImgUrl,
        },
        celeb: {
          celebId: data.celeb.id,
          celebName: data.celeb.celebTotalNameKr,
        },
        itemName: data.itemName,
        price: data.price,
        color: data.color,
        additionalInfo: data.additionalInfo,
        hashTagList: editHashTagList,
        linkList: data.linkList,
        infoSource: data.infoSource,
        newBrand: { brandName: data.newBrandName },
      }
      setItemInfo(newState)
    }
  }, [data])

  const setCelebInfoInItem = useSetRecoilState(celebInfoInItemState)

  useEffect(() => {
    const newImgList: ImgResult[] = imgList.map((img: Image, idx) => ({
      imgUrl: img.imgUrl ? img.imgUrl : '',
      representFlag: idx === 0,
      sortOrder: idx,
    }))
    if (imgList.length > 0) setItemInfo({ ...itemInfo, imgList: newImgList })
  }, [imgList])

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
      const finalHashTags: Array<number> | null = []
      if ((itemInfo.hashTagList?.length ?? 0) > 0) {
        itemInfo?.hashTagList?.map((item) => {
          if (item.hashtagId) finalHashTags?.push(item.hashtagId)
        })
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
        hashTagIdList: finalHashTags,
        linkList: itemInfo.linkList,
        infoSource: itemInfo.infoSource === '' ? null : itemInfo.infoSource,
        newCelebId: itemInfo.newCeleb?.celebId ?? null,
        newBrandId: itemInfo.newBrand?.brandId ?? null,
      }
      mutate(item)
      resetItemInfo()
      resetCelebInfoInItem()
      resetCategory()
      resetParentCategory()
      resetImgListState()
    } else {
      alert('오류가 발생했어요. 다시 시도해주세요')
    }
  }

  const resetItemInfo = useResetRecoilState(itemInfoState)
  const resetCelebInfoInItem = useResetRecoilState(celebInfoInItemState)
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
        <Header
          isModalHeader={false}
          title='정보 수정하기'
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
          <CelebWrapper>
            <ButtonMedium text={celeb.celebNameKr} type='pri' active={true}></ButtonMedium>
          </CelebWrapper>
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
          <div className='button' onClick={() => navigate('/item/edit/addInfo')}>
            {itemInfo.additionalInfo && itemInfo.additionalInfo?.length > 0 ? (
              <InfoAddOn></InfoAddOn>
            ) : (
              <InfoAddOff></InfoAddOff>
            )}

            <span>추가 정보</span>
          </div>
          <div className='button' onClick={() => navigate('/item/edit/addlink')}>
            {itemInfo.linkList && itemInfo.linkList.length > 0 ? (
              <LinkAddOn></LinkAddOn>
            ) : (
              <LinkAddOff></LinkAddOff>
            )}
            <span>구매 링크</span>
          </div>
        </div>
      </BottomBar>
    </ItemCreatePageStyle>
  )
}

export default ItemEdit
