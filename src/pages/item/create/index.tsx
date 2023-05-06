import React, { useState } from 'react'
import BrandItemField, {
  itemNameState,
  selectedBrandState,
} from './components/BrandItemField/BrandItemField'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import DatePlaceField from './components/DatePlaceField/DatePlaceField'
import PriceField, { itemPriceState } from './components/PriceField/PriceField'
import { useNavigate } from 'react-router-dom'
import { modals } from '../../../components/Modals'
import useModals from '../../../components/Modals/hooks/useModals'
import SelectCeleb, {
  CelebData,
  selectedGroupState,
} from '../../../components/SelectCeleb/SelectCeleb'

const Itzy = {
  id: 0,
  celebNameKr: '있지',
  subCelebList: [
    {
      id: 1,
      celebNameKr: '예지',
    },
    {
      id: 2,
      celebNameKr: '리아',
    },
    {
      id: 3,
      celebNameKr: '류진',
    },
    {
      id: 4,
      celebNameKr: '채령',
    },
    {
      id: 5,
      celebNameKr: '유나',
    },
    {
      id: 6,
      celebNameKr: '레미콘',
    },
    {
      id: 7,
      celebNameKr: '유진',
    },
  ],
}

const ItemCreate = () => {
  const { openModal } = useModals()
  const navigate = useNavigate()

  const [brandValid, setBrandValid] = useState(true)
  const [itemValid, setItemValid] = useState(true)
  const brand = useRecoilValue(selectedBrandState)
  const itemName = useRecoilValue(itemNameState)
  const [hasTriedToUpload, setHasTriedToUpload] = useState(false)
  const itemPrice = useRecoilValue(itemPriceState)

  // const selectedCeleb = useRecoilValue(selectedCelebState)
  const setSelectedGroup = useSetRecoilState(selectedGroupState)

  const onCheckValid = () => {
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
  const onClick = () => {
    alert(itemPrice)
  }
  const onGroupSelect = (group: CelebData) => {
    openModal(modals.ItemCelebSelectModal)
    setSelectedGroup(group)
  }
  const onSearchSelect = () => {
    openModal(modals.ItemCelebSearchModal)
  }

  return (
    <div>
      Item Create
      <br />
      <button onClick={onCheckValid}>업로드</button>
      <br />
      <button onClick={() => onGroupSelect(Itzy)}>있지</button>
      <br />
      <button onClick={() => onSearchSelect()}>검색</button>
      <br />
      <button onClick={() => navigate('/item/create/addInfo')}>추가 정보</button>
      <br />
      <button onClick={onClick}>아이템 가격 확인</button>
      <br />
      <button onClick={() => navigate('/item/create/addlink')}>링크추가</button>
      <DatePlaceField />
      <br />
      {/* <span>{selectedCeleb.celebNameKr}</span> */}
      <BrandItemField
        brandValid={hasTriedToUpload ? brandValid : true}
        itemNameValid={hasTriedToUpload ? itemValid : true}
      ></BrandItemField>
      <br />
      <PriceField></PriceField>
      <SelectCeleb></SelectCeleb>
    </div>
  )
}

export default ItemCreate
