import React, { memo, useEffect } from 'react'
import AddPhotos, { Image, imgListState } from '../../../../../components/AddPhotos/AddPhotos'
import { useRecoilState, useRecoilValue } from 'recoil'
import DefaultImageField from './DefaultImageField'
import { ImgResult } from '../../../../../apis/item/itemService.type'
import { itemInfoState } from '../../../../../recoil/itemInfo'

interface ImageFieldProps {
  hasTriedToUpload: boolean
}

const ImageField = ({ hasTriedToUpload }: ImageFieldProps) => {
  const imgList = useRecoilValue(imgListState)
  const [itemInfo, setItemInfo] = useRecoilState(itemInfoState)
  useEffect(() => {
    const newImgList: ImgResult[] = imgList.map((img: Image, idx) => ({
      imgUrl: img.imgUrl ? img.imgUrl : '',
      representFlag: idx === 0,
      sortOrder: idx,
    }))
    if (imgList.length > 0) setItemInfo({ ...itemInfo, imgList: newImgList })
  }, [imgList])
  return (
    <>
      {imgList.length > 0 ? (
        <AddPhotos></AddPhotos>
      ) : (
        <DefaultImageField error={hasTriedToUpload && !imgList.length}></DefaultImageField>
      )}
    </>
  )
}

export default memo(ImageField)
