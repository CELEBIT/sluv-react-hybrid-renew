import React from 'react'
import styled from '@emotion/styled'
import { ReactComponent as Represent } from '../../assets/represent_24.svg'
import { ReactComponent as DeleteList } from '../../assets/delete_list_24.svg'
import { ReactComponent as StorageOff } from '../../assets/storage_list_off_24.svg'
import { ReactComponent as StorageOn } from '../../assets/storage_on_24.svg'

interface PhotoProps {
  size: number
  borderRadius: number
  imgUrl: string
  candelete?: boolean // 정보 공유하기 -> 삭제 여부를 위해 존재
  onDelete?: () => void
  representFlag?: boolean // 정보 공유하기 -> 대표사진 여부를 위해 존재
  storageFlag?: boolean // 아이템 상세 -> 바인더 저장여부
}

const Photo = ({
  size,
  borderRadius,
  imgUrl,
  candelete,
  onDelete,
  representFlag,
  storageFlag,
}: PhotoProps) => {
  return (
    <Img size={size} borderRadius={borderRadius} imgUrl={imgUrl}>
      {candelete && <DeleteList className='delete' onClick={onDelete}></DeleteList>}
      {representFlag && <Represent className='represent'></Represent>}
      {storageFlag ? (
        <StorageOn className='represent'></StorageOn>
      ) : (
        <StorageOff className='represent'></StorageOff>
      )}
    </Img>
  )
}

export default Photo

export const Img = styled.div<{ size: number; borderRadius: number; imgUrl: string }>`
  display: flex;
  position: relative;
  flex-shrink: 0;
  width: ${(props) => props.size * 0.0625}rem;
  height: ${(props) => props.size * 0.0625}rem;
  border-radius: ${(props) => props.borderRadius * 0.0625}rem;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  background-image: url(${(props) => props.imgUrl});

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
