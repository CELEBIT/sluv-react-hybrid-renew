import React, { useState } from 'react'
import BrandItemField, {
  itemNameState,
  selectedBrandState,
} from './components/BrandItemField/BrandItemField'
import { useRecoilValue } from 'recoil'
import DatePlaceField from './components/DatePlaceField/DatePlaceField'

const ItemCreate = () => {
  const [brandValid, setBrandValid] = useState(true)
  const [itemValid, setItemValid] = useState(true)
  const brand = useRecoilValue(selectedBrandState)
  const itemName = useRecoilValue(itemNameState)
  const [hasTriedToUpload, setHasTriedToUpload] = useState(false)

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

  return (
    <div>
      Item Create
      <br />
      <button onClick={onCheckValid}>업로드</button>
      <br />
      <br />
      <DatePlaceField />
      <br />
      <BrandItemField
        brandValid={hasTriedToUpload ? brandValid : true}
        itemNameValid={hasTriedToUpload ? itemValid : true}
      ></BrandItemField>
    </div>
  )
}

export default ItemCreate
