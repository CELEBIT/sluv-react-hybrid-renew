import React, { useMemo } from 'react'
import { ReactComponent as Delete } from '../../../../../../../assets/delete_textfield_24.svg'
import { ImageField } from './ExistingItem'

interface UploadPhotoProps {
  imgFile?: File
  imgUrl?: string
  className?: string
  onDelete: () => void
}

const UploadPhoto = ({ imgFile, imgUrl, className, onDelete }: UploadPhotoProps) => {
  const imageFieldComponent = useMemo(() => {
    return (
      <ImageField imgUrl={imgUrl} imgFile={imgFile} className={className}>
        <Delete className='delete' onClick={() => onDelete()}></Delete>
      </ImageField>
    )
  }, [imgFile, className, onDelete])

  return <>{imageFieldComponent}</>
}

export default React.memo(UploadPhoto)
