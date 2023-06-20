import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { ReactComponent as Represent } from '../../assets/represent_24.svg'
import { ReactComponent as DeleteList } from '../../assets/delete_list_24.svg'
import { ReactComponent as StorageOff } from '../../assets/storage_list_off_24.svg'
import { ReactComponent as StorageOn } from '../../assets/storage_on_24.svg'
import { ReactComponent as CheckOff } from '../../assets/checkbox_off_32.svg'
import { ReactComponent as CheckOn } from '../../assets/checkbox_on_32.svg'
import { Common } from '../styles'

interface PhotoProps {
  size?: number
  borderRadius: number
  imgUrl?: string
  imgFile?: File
  candelete?: boolean // 정보 공유하기 -> 삭제 여부를 위해 존재
  onDelete?: () => void
  representFlag?: boolean // 정보 공유하기 -> 대표사진 여부를 위해 존재
  storageFlag?: boolean // 아이템 상세 -> 바인더 저장여부
  isSelected?: boolean // 커뮤니티 아이템 선택 -> 아이템 선택 여부
}

const Photo = ({
  size,
  borderRadius,
  imgUrl,
  imgFile,
  candelete,
  onDelete,
  representFlag,
  storageFlag,
  isSelected,
}: PhotoProps) => {
  const [previewFile, setPreviewFile] = useState<string>('')

  useEffect(() => {
    if (imgFile) {
      const reader = new FileReader()
      reader.readAsDataURL(imgFile)
      reader.onloadend = () => {
        setPreviewFile(reader.result as string)
      }
    }
  }, [])

  if (imgUrl) {
    return (
      <Img size={size} borderRadius={borderRadius} imgUrl={imgUrl}>
        {candelete && <DeleteList className='delete' onClick={onDelete}></DeleteList>}
        {representFlag && <Represent className='represent'></Represent>}
        {storageFlag !== undefined && (
          <>
            {storageFlag ? (
              <StorageOn className='represent'></StorageOn>
            ) : (
              <StorageOff className='represent'></StorageOff>
            )}
          </>
        )}
        {isSelected !== undefined && (
          <>
            {isSelected ? (
              <CheckOn className='select'></CheckOn>
            ) : (
              <CheckOff className='select'></CheckOff>
            )}
          </>
        )}
      </Img>
    )
  } else {
    return (
      <ImgFileWrap size={size} borderRadius={borderRadius}>
        <img src={previewFile} />
        {candelete && <DeleteList className='delete' onClick={onDelete}></DeleteList>}
        {representFlag && <Represent className='represent'></Represent>}
        {storageFlag !== undefined && (
          <>
            {storageFlag ? (
              <StorageOn className='represent'></StorageOn>
            ) : (
              <StorageOff className='represent'></StorageOff>
            )}
          </>
        )}
      </ImgFileWrap>
    )
  }
}

export default Photo

export const Img = styled.div<{ size?: number; borderRadius: number; imgUrl: string }>`
  display: flex;
  position: relative;
  flex-shrink: 0;
  width: ${(props) => (props.size ? `${props.size * 0.0625}rem` : '100%')};
  padding-top: 100%;
  border-radius: ${(props) => props.borderRadius * 0.0625}rem;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  background-image: url(${(props) => props.imgUrl});
  background-color: ${Common.colors.GR300};

  .delete {
    position: absolute;
    top: 0px;
    right: 0px;
    transform: translate(50%, -50%);
  }

  .represent {
    position: absolute;
    right: 0.25rem;
    bottom: 0.25rem;
  }
  .select {
    position: absolute;
    right: 0.25rem;
    top: 0.25rem;
  }
`
const ImgFileWrap = styled.div<{ size?: number; borderRadius: number }>`
  background-color: ${Common.colors.GR300};
  display: flex;
  position: relative;
  flex-shrink: 0;
  border-radius: ${(props) => props.borderRadius * 0.0625}rem;

  img {
    width: ${(props) => props.size && `${props.size * 0.0625}rem`};
    height: ${(props) => props.size && `${props.size * 0.0625}rem`};
    border-radius: ${(props) => props.borderRadius * 0.0625}rem;
  }

  .delete {
    position: absolute;
    top: 0px;
    right: 0px;
    transform: translate(50%, -50%);
  }

  .represent {
    position: absolute;
    right: 0.25rem;
    bottom: 0.25rem;
  }
`
