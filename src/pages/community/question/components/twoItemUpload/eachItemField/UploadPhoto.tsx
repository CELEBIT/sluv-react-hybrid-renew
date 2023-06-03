import React from 'react'
import { ReactComponent as Delete } from '../../../../../../assets/delete_textfield_24.svg'
import { ImageField } from './ExistingItem'

interface UploadPhotoProps {
  imgUrl: string
  className?: string
  onDelete: any
}

const UploadPhoto = ({ imgUrl, className, onDelete }: UploadPhotoProps) => {
  // 유저가 갤러리에서 업로드한 사진 아이템
  return (
    <ImageField imgUrl={imgUrl} className={className}>
      <Delete className='delete' onClick={onDelete}></Delete>
    </ImageField>
  )
}

export default UploadPhoto
