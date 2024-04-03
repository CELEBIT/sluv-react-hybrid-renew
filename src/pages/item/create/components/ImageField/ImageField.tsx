import React from 'react'
import AddPhotos, { imgListState } from '../../../../../components/AddPhotos/AddPhotos'
import { useRecoilValue } from 'recoil'
import DefaultImageField from './DefaultImageField'

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

export default ImageField
