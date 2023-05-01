import React, { useState } from 'react'
import BrandItemField, {
  itemNameState,
  selectedBrandState,
} from './component/BrandItemField/BrandItemField'
import { useRecoilValue } from 'recoil'
import DatePlaceField from './component/DatePlaceField/DatePlaceField'
import PriceField, { itemPriceState } from './component/PriceField/PriceField'

const ItemCreate = () => {
  const [brandValid, setBrandValid] = useState(true)
  const [itemValid, setItemValid] = useState(true)
  const brand = useRecoilValue(selectedBrandState)
  const itemName = useRecoilValue(itemNameState)
  const [hasTriedToUpload, setHasTriedToUpload] = useState(false)
  const itemPrice = useRecoilValue(itemPriceState)
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

  return (
    <div>
      Item Create
      <br />
      <button onClick={onCheckValid}>업로드</button>
      <br />
      <br />
      <button onClick={onClick}>아이템 가격 확인</button>
      <DatePlaceField />
      <br />
      <BrandItemField
        brandValid={hasTriedToUpload ? brandValid : true}
        itemNameValid={hasTriedToUpload ? itemValid : true}
      ></BrandItemField>
      <br />
      <PriceField></PriceField>
    </div>
  )
}

export default ItemCreate
