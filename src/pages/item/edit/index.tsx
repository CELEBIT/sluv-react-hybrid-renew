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
import { ReactComponent as LinkAddOn } from '../../../assets/link_add_on_20.svg'
import { ReactComponent as InfoAddOn } from '../../../assets/info_add_on_20.svg'
import { HeaderWrapper } from '../addInfo/styles'
import { ErrorText } from '../../../components/TextField/DefaultTextfield/styles'
import ImageField from '../create/components/ImageField/ImageField'
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
  itemS3ImgListState,
} from '../../../recoil/itemInfo'
import useModals from '../../../components/Modals/hooks/useModals'
import useItemQuery from '../../../apis/item/hooks/useItemQuery'
import {
  HashTagResult,
  ImgResult,
  LinkResult,
  TempItemReq,
} from '../../../apis/item/itemService.type'
import useItemDetailQuery from '../../../apis/item/hooks/useItemDetailQuery'
import { Image, imgListState } from '../../../components/AddPhotos/AddPhotos'
import { selectedCelebState } from '../../../components/SelectCeleb/SelectCeleb'
import Header from '../../../components/Header/Header'
import SelectCategory from '../create/components/SelectCategory/SelectCategory'
import ButtonMedium from '../../../components/ButtonMedium/ButtonMedium'
import { CelebWrapper } from './styles'
import { hashTagState } from '../addInfo/components/HashTags/HashTag'
import useItemImgUpload from '../../../apis/s3/hooks/useItemImgUpload'
import { linksState } from '../addLink/components/LinkInput/LinkInput'

const ItemEdit = () => {
  const navigate = useNavigate()
  const [hasTriedToUpload, setHasTriedToUpload] = useState(false)

  const { id: itemId } = useParams()
  const { getItemDetail } = useItemDetailQuery()

  // 1. 아이템 정보 불러오기
  const { data } = getItemDetail(Number(itemId))

  // Item 이미지 리스트
  const [imgList, setImgList] = useRecoilState(imgListState)
  const [s3ImgList, setS3ImgList] = useRecoilState(itemS3ImgListState)
  // Celeb ID
  const [celebInfoInItem, setCelebInfoInItem] = useRecoilState(createItemCelebState)
  // NewCeleb ID
  const [newCeleb, setNewCeleb] = useRecoilState(createItemNewCelebState)
  // 착용 날짜
  const [whenDiscovery, setWhenDiscovery] = useRecoilState(createItemWhenDateState)
  // 착용 장소
  const [whereDiscovery, setWhereDiscovery] = useRecoilState(createItemPlaceState)
  // 아이템 카테고리
  const [category, setCategory] = useRecoilState(createItemCategoryState)
  // 브랜드 ID
  const [brand, setBrand] = useRecoilState(createItemBrandState)
  // NewBrand ID
  const [newBrand, setNewBrand] = useRecoilState(createItemNewBrandState)
  // 아이템 이름
  const [itemName, setItemName] = useRecoilState(createItemNameState)
  // 가격
  const [price, setPrice] = useRecoilState(createItemPriceState)
  // 추가정보
  const [additionalInfo, setAdditionalInfo] = useRecoilState(createItemAddInfoState)
  const [hashTags, setHashTags] = useRecoilState(hashTagState)
  const [source, setSource] = useRecoilState(createItemSourceState)
  // 구매링크
  const [linkList, setLinkList] = useRecoilState(createItemLinkState)
  const [links, setLinks] = useRecoilState(linksState)

  useEffect(() => {
    if (data) {
      setImgList(data.imgList ?? [])
      // 셀럽 설정
      setCelebInfoInItem(
        data.celeb
          ? {
              groupId: data.celeb.parentId !== null ? data.celeb.parentId : null,
              groupName:
                data.celeb.celebParentNameKr !== null ? data.celeb.celebParentNameKr : null,
              soloId: data.celeb.id !== null ? data.celeb.id : null,
              soloName: data.celeb.celebChildNameKr !== null ? data.celeb.celebChildNameKr : null,
            }
          : null,
      )
      setNewCeleb(
        data.newCeleb
          ? {
              id: data.newCeleb.newCelebId,
              newCelebName: data.newCeleb.newCelebName,
            }
          : null,
      )
      setWhenDiscovery(data.whenDiscovery ? new Date(data.whenDiscovery) : null)
      setWhereDiscovery(data.whereDiscovery)
      setCategory(
        data.category
          ? {
              categoryId: data.category.id,
              childName: data.category.name,
              parentCategoryId: data.category.parentId,
              parentName: data.category.parentName,
            }
          : null,
      )
      setBrand(
        data.brand
          ? {
              brandId: data.brand.id,
              brandName: data.brand.brandKr,
              brandImgUrl: data.brand.brandImgUrl,
            }
          : null,
      )
      setNewBrand(
        data.newBrand
          ? {
              brandId: data.newBrand.newBrandId,
              brandName: data.newBrand.newBrandName,
            }
          : null,
      )
      setItemName(data.itemName ?? data.itemName)
      setPrice(data.price ?? data.price)
      if (!additionalInfo) {
        setAdditionalInfo(data.additionalInfo)
      }

      if (!linkList) {
        setLinkList(data.linkList)
      }
      if (!source) {
        setSource(data.infoSource ?? null)
      }
      // 해시태그 설정
      const convertedHashtags: Array<IHashTag> = []
      data.hashTagList &&
        data.hashTagList.length > 0 &&
        data.hashTagList.map((item) => {
          convertedHashtags.push({
            hashtagId: item.hashtagId,
            hashtagContent: item.hashtagContent,
          })
        })
      if (hashTags.length === 0) {
        setHashTags(convertedHashtags ?? null)
      }
    }
  }, [data])

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
      mutateByImgUpload(imgList)
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
        id: Number(itemId),
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

  const onBackClick = () => {
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
    navigate(`/item/detail/${itemId}`)
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
          <ImageField hasTriedToUpload={hasTriedToUpload}></ImageField>
        </ComponentWrapper>
        <ComponentWrapper>
          <LabelContainer>
            {hasTriedToUpload && !(celebInfoInItem?.soloId || newCeleb?.id) && <Error></Error>}
            <Label>누가 착용했나요?</Label>
          </LabelContainer>
          <CelebWrapper>
            <ButtonMedium
              text={
                celebInfoInItem?.groupName
                  ? celebInfoInItem?.groupName + ' ' + celebInfoInItem.soloName
                  : celebInfoInItem?.soloName ?? ''
              }
              type='pri'
              active={true}
            ></ButtonMedium>
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
          <div className='button' onClick={() => navigate('/item/edit/addInfo')}>
            {(additionalInfo && additionalInfo?.length > 0) || (hashTags && hashTags.length > 0) ? (
              <InfoAddOn></InfoAddOn>
            ) : (
              <InfoAddOff></InfoAddOff>
            )}

            <span>추가 정보</span>
          </div>
          <div className='button' onClick={() => navigate('/item/edit/addlink')}>
            {linkList && linkList.length > 0 ? <LinkAddOn></LinkAddOn> : <LinkAddOff></LinkAddOff>}
            <span>구매 링크</span>
          </div>
        </div>
      </BottomBar>
    </ItemCreatePageStyle>
  )
}

export default ItemEdit
