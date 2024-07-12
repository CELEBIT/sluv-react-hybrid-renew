import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { ReactComponent as Represent } from '../../assets/represent_24.svg'
import { ReactComponent as DeleteList } from '../../assets/delete_list_24.svg'
import { ReactComponent as StorageOff } from '../../assets/storage_list_off_24.svg'
import { ReactComponent as StorageOn } from '../../assets/storage_on_24.svg'
import { ReactComponent as CheckOff } from '../../assets/checkbox_off_32.svg'
import { ReactComponent as CheckOn } from '../../assets/checkbox_on_32.svg'
import { Common } from '../styles'
import { deleteScrap } from '../../apis/closet'
import { useQueryClient } from '@tanstack/react-query'
import useModals from '../Modals/hooks/useModals'
import { queryKeys } from '../../config/queryKeys'
import { ItemClosetListModal } from '../../pages/closet/detail'
import { modals } from '../Modals'
import { toast } from 'react-toastify'

interface PhotoProps {
  itemId?: number
  size?: number
  borderRadius: number
  imgUrl?: string
  // imgFile?: File
  candelete?: boolean // 정보 공유하기 -> 삭제 여부를 위해 존재
  onDelete?: () => void
  representFlag?: boolean // 정보 공유하기 -> 대표사진 여부를 위해 존재
  storageFlag?: boolean // 아이템 상세 -> 바인더 저장여부
  isSelected?: boolean // 커뮤니티 아이템 선택 -> 아이템 선택 여부
  isPreview?: boolean
}

const Photo = ({
  itemId,
  size,
  borderRadius,
  imgUrl,
  // imgFile,
  candelete,
  onDelete,
  representFlag,
  storageFlag,
  isSelected,
  isPreview,
}: PhotoProps) => {
  const queryClient = useQueryClient()
  const { openModal } = useModals()

  const handleScrapItem = async (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation()
    if (isPreview) {
      openModal(modals.LoginToContinueModal)
    } else {
      if (storageFlag) {
        const res = await deleteScrap(Number(itemId))
        //
        if (res.isSuccess) {
          toast('아이템 저장이 취소되었어요')
          queryClient.invalidateQueries()
        }
      } else {
        openModal(ItemClosetListModal, { itemId: String(itemId) ?? '' })
      }
    }
  }

  return (
    <Img size={size} borderRadius={borderRadius} imgUrl={imgUrl}>
      {imgUrl && <ItemCardDim size={size} borderRadius={borderRadius}></ItemCardDim>}
      {candelete && <DeleteList className='delete' onClick={onDelete}></DeleteList>}
      {representFlag && <Represent className='represent'></Represent>}
      {storageFlag !== undefined && (
        <>
          {storageFlag ? (
            <StorageOn className='represent' onClick={(e) => handleScrapItem(e)}></StorageOn>
          ) : (
            <StorageOff className='represent' onClick={(e) => handleScrapItem(e)}></StorageOff>
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
}

export default Photo

export const Img = styled.div<{
  size?: number
  borderRadius: number
  imgUrl?: string
  // imgFile?: File
}>`
  display: flex;
  position: relative;
  width: ${(props) => (props.size ? `${props.size * 0.0625}rem` : '100%')};
  height: ${(props) => (props.size ? `${props.size * 0.0625}rem` : '100%')};
  border-radius: ${(props) => props.borderRadius * 0.0625}rem;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  background-image: ${(props) => `url(${props.imgUrl})`};
  background-color: ${Common.colors.GR300};
  .delete {
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 5;
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

const ItemCardDim = styled.div<{ size?: number; borderRadius: number }>`
  /* display:L */
  position: absolute;
  width: ${(props) => (props.size ? `${props.size * 0.0625}rem` : '100%')};
  height: ${(props) => (props.size ? `${props.size * 0.0625}rem` : '100%')};
  border-radius: ${(props) => props.borderRadius * 0.0625}rem;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.4000000059604645;
  background: linear-gradient(360deg, #212529 0%, rgba(33, 37, 41, 0) 100%);
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
