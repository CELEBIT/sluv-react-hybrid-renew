import React, { useState } from 'react'
import BrandItemField, {
  itemNameState,
  selectedBrandState,
} from './component/BrandItemField/BrandItemField'
import { useRecoilState } from 'recoil'

const ItemCreate = () => {
  const [brandValid, setBrandValid] = useState(true)
  const [itemValid, setItemValid] = useState(true)
  const [brand, setSelectedBrand] = useRecoilState(selectedBrandState)
  const [itemName, setItemName] = useRecoilState(itemNameState)
  const [hasTriedToUpload, setHasTriedToUpload] = useState(false)

  const onSetBrand = () => {
    setSelectedBrand('마하그리드')
  }
  const onSetItemName = () => {
    setItemName('블루 체크 포인트 후드티')
  }

  const onCheckValid = () => {
    setHasTriedToUpload(true)
    if (!brand) {
      setBrandValid(false)
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
    <div>
      Item Create
      <br />
      <button onClick={onCheckValid}>업로드</button>
      <br />
      <button onClick={onSetBrand}>브랜드 선택</button>
      <br />
      <button onClick={onSetItemName}>아이템 선택</button>
      <br />
      <BrandItemField
        brandValid={hasTriedToUpload ? brandValid : true}
        itemNameValid={hasTriedToUpload ? itemValid : true}
      ></BrandItemField>
    </div>
  )
}

export default ItemCreate
