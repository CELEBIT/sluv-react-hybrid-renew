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
