import React from 'react'
import AddPhotos from '../../../../../components/AddPhotos/AddPhotos'
import { useRecoilValue } from 'recoil'
import DefaultImageField from './DefaultImageField'
import { imgListState } from '../../../../../recoil/communityInfo'

interface ImageFieldProps {
  hasTriedToUpload: boolean
}

const ImageField = ({ hasTriedToUpload }: ImageFieldProps) => {
  const imgList = useRecoilValue(imgListState)
  return (
    <>
      {imgList.length ? (
        <AddPhotos></AddPhotos>
      ) : (
        <DefaultImageField error={hasTriedToUpload && !imgList.length}></DefaultImageField>
      )}
    </>
  )
}

export default ImageField
