import React, { useState } from 'react'
import BrandItemField, {
  itemNameState,
  selectedBrandState,
} from './components/BrandItemField/BrandItemField'
import { useRecoilValue } from 'recoil'
import DatePlaceField from './components/DatePlaceField/DatePlaceField'
import PriceField from './components/PriceField/PriceField'
import { useNavigate } from 'react-router-dom'
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
// import { ReactComponent as LinkAddOn } from '../../../assets/link_add_on_20.svg'
import { ReactComponent as LinkAddOff } from '../../../assets/link_add_off_20.svg'
// import { ReactComponent as InfoAddOn } from '../../../assets/info_add_on_20.svg'
import { ReactComponent as InfoAddOff } from '../../../assets/info_add_off_20.svg'
// import { ReactComponent as StorageOn } from '../../../assets/storage_on_20.svg'
import { ReactComponent as StorageOff } from '../../../assets/storage_off_20.svg'
import { HeaderWrapper } from '../addInfo/styles'
import { ErrorText } from '../../../components/TextField/DefaultTextfield/styles'
// const Itzy = {
//   id: 0,
//   celebNameKr: '있지',
//   subCelebList: [
//     {
//       id: 1,
//       celebNameKr: '예지',
//     },
//     {
//       id: 2,
//       celebNameKr: '리아',
//     },
//     {
//       id: 3,
//       celebNameKr: '류진',
//     },
//     {
//       id: 4,
//       celebNameKr: '채령',
//     },
//     {
//       id: 5,
//       celebNameKr: '유나',
//     },
//     {
//       id: 6,
//       celebNameKr: '레미콘',
//     },
//     {
//       id: 7,
//       celebNameKr: '유진',
//     },
//   ],
// }

const ItemCreate = () => {
  const navigate = useNavigate()
  // const [celebValid, setCelebValid] = useState(true)
  const [brandValid, setBrandValid] = useState(true)
  const [itemValid, setItemValid] = useState(true)
  const brand = useRecoilValue(selectedBrandState)
  const itemName = useRecoilValue(itemNameState)
  const [hasTriedToUpload, setHasTriedToUpload] = useState(false)

  const onSubmit = () => {
    setHasTriedToUpload(true)
    if (!brand) {
      setBrandValid(false)
      alert('empty brand')
      console.log('empty brand')
    } else {
      setBrandValid(true)
    }
    if (!itemName) {
      setItemValid(false)
    } else {
      setItemValid(true)
    }
    if (brand && itemName) {
      alert('success')
    }
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
          <LabelContainer>
            {brandValid && <Error></Error>}
            <Label>누가 착용했나요?</Label>
          </LabelContainer>
          <SelectCeleb></SelectCeleb>
          {hasTriedToUpload === false && brandValid === true && (
            <ErrorText className='error'>필수 항목입니다</ErrorText>
          )}
        </ComponentWrapper>
        <ComponentWrapper>
          <Label>언제 어디서 착용했나요?</Label>
          <DatePlaceField />
        </ComponentWrapper>
        <ComponentWrapper>
          <LabelContainer>
            {brandValid && <Error></Error>}
            <Label>어떤 아이템인가요?</Label>
          </LabelContainer>
          <SelectCategory />
          {hasTriedToUpload === false && brandValid === true && (
            <ErrorText className='error'>필수 항목입니다</ErrorText>
          )}
          <BrandItemField
            brandValid={hasTriedToUpload ? brandValid : true}
            itemNameValid={hasTriedToUpload ? itemValid : true}
          ></BrandItemField>
          {hasTriedToUpload === false && brandValid === true && (
            <ErrorText className='error'>필수 항목입니다</ErrorText>
          )}
          {brand.id && (
            <>
              <PriceField></PriceField>
              {hasTriedToUpload === false && brandValid === true && (
                <ErrorText className='error'>필수 항목입니다</ErrorText>
              )}
            </>
          )}
        </ComponentWrapper>
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
            <StorageOff onClick={() => navigate('/item/create/addlink')}></StorageOff>
          </div>
        </BottomBar>
      </ComponentContainer>
    </ItemCreatePageStyle>
  )
}

export default ItemCreate
