import React, { useState } from 'react'
import BrandItemField, { itemNameState } from './components/BrandItemField/BrandItemField'
import { useRecoilValue } from 'recoil'
import DatePlaceField from './components/DatePlaceField/DatePlaceField'
import PriceField, { itemPriceState } from './components/PriceField/PriceField'
import { useNavigate } from 'react-router-dom'
import SelectCeleb, { selectedCelebState } from '../../../components/SelectCeleb/SelectCeleb'
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
// import { ReactComponent as LinkAddOn } from '../../../assets/link_add_on_20.svg'
import { ReactComponent as LinkAddOff } from '../../../assets/link_add_off_20.svg'
// import { ReactComponent as InfoAddOn } from '../../../assets/info_add_on_20.svg'
import { ReactComponent as InfoAddOff } from '../../../assets/info_add_off_20.svg'
// import { ReactComponent as StorageOn } from '../../../assets/storage_on_20.svg'
import { ReactComponent as StorageOff } from '../../../assets/storage_off_20.svg'
import { HeaderWrapper } from '../addInfo/styles'
import { ErrorText } from '../../../components/TextField/DefaultTextfield/styles'
import { selectedSubCategoryState } from '../../../components/BottomSheetModal/ItemCategoryModal'
import { addInfoTextState } from '../addInfo'
import { linksState } from '../addLink/components/LinkInput/LinkInput'
import { infoSourceState } from '../addInfo/components/sourceInput/SourceInput'
import ImageField from './components/ImageField/ImageField'
import { itemInfoState } from '../../../recoil/itemInfo'

const ItemCreate = () => {
  const navigate = useNavigate()
  const celeb = useRecoilValue(selectedCelebState)
  const category = useRecoilValue(selectedSubCategoryState)
  const itemName = useRecoilValue(itemNameState)
  const price = useRecoilValue(itemPriceState)
  const additionalInfo = useRecoilValue(addInfoTextState)
  const infoSource = useRecoilValue(infoSourceState)
  const links = useRecoilValue(linksState)
  const [hasTriedToUpload, setHasTriedToUpload] = useState(false)
  const itemInfo = useRecoilValue(itemInfoState)

  const onSubmit = () => {
    setHasTriedToUpload(true)
    if (
      celeb.id &&
      category.id &&
      (itemInfo.brand?.brandId || itemInfo.newBrand?.brandId) &&
      itemName &&
      price
    ) {
      alert('success')
    } else {
      alert('fail')
    }
    const newItem = {
      id: 0,
      imgList: [
        {
          imgUrl: 'string',
          representFlag: true,
        },
      ],
      celebId: celeb.id,
      whenDiscovery: null,
      whereDiscovery: null,
      categoryId: category.id,
      brandId: null,
      itemName: itemName,
      price: price !== 0 ? price : null,
      color: null,
      additionalInfo: additionalInfo ? additionalInfo : null,
      hashTagIdList: [0],
      linkList: links[0].linkName ? links : null,
      infoSource: infoSource ? infoSource : null,
      newCelebId: 0,
      newBrandId: 0,
    }
    console.log(newItem)
  }

  return (
    <ItemCreatePageStyle>
      <HeaderWrapper>
        <Header isModalHeader={false} title='정보 공유하기' hasArrow={true}>
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
              (!category.id || !itemInfo.brand || !itemInfo.newBrand || !itemName || !price) && (
                <Error></Error>
              )}
            <Label>어떤 아이템인가요?</Label>
          </LabelContainer>
          <SelectCategory />
          {hasTriedToUpload && !category.id && (
            <ErrorText className='error'>필수 항목입니다</ErrorText>
          )}
          <ComponentWrapper className='padding'>
            <BrandItemField
              brandValid={hasTriedToUpload ? !itemInfo.brand || !itemInfo.newBrand : true}
              itemNameValid={hasTriedToUpload ? itemName !== '' : true}
            ></BrandItemField>
          </ComponentWrapper>
          {(itemInfo.brand?.brandId || itemInfo.newBrand?.brandId) && (
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
