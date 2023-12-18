import React from 'react'
import { ReactComponent as Delete } from '../../../../../../../assets/delete_textfield_24.svg'
import { ImageField } from './ExistingItem'

interface UploadPhotoProps {
  imgFile: File
  className?: string
  onDelete: any
}

const UploadPhoto = ({ imgFile, className, onDelete }: UploadPhotoProps) => {
  return (
    <ImageField imgUrl={URL.createObjectURL(imgFile)} className={className}>
      <Delete className='delete' onClick={() => onDelete()}></Delete>
    </ImageField>
  )
}

export default UploadPhoto
