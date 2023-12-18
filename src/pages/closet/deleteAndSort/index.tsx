import React, { useState } from 'react'

import * as S from '../create/styles'
import Header from '../../../components/Header/Header'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { closetQueryConfig } from '../../../apis/closet/hooks'
import { ClosetBoxModel } from '../../../apis/closet/model'
import useModals from '../../../components/Modals/hooks/useModals'
import TwoButtonModal from '../../../components/TwoButtonModal'
import { BtnModalContent } from '../../../components/Modals/styles'
import { deleteCloset } from '../../../apis/closet'
import NameTag from '../components/NameTag'

import { ReactComponent as DeleteIcon } from '../../../assets/delete_list_24.svg'
import { MockedIcon } from '../create/styles'
import { useNavigate } from 'react-router-dom'

export type DeleteRecheckModalParam = {
  handleCancel: (...args: any) => void
  handleConfirm: (...args: any) => void
}
export const DeleteReCheckModal = ({ handleCancel, handleConfirm }: DeleteRecheckModalParam) => {
  return (
    <TwoButtonModal
      leftButtonName={'취소하기'}
      rightButtonName={'삭제하기'}
      rightButtonOnClick={handleConfirm}
      leftButtonOnClick={handleCancel}
    >
      <BtnModalContent>
        옷장을 삭제하실 건가요?
        <br />
        옷장 내 아이템도 함께 삭제돼요.
      </BtnModalContent>
    </TwoButtonModal>
  )
}

const ClosetEditAndSortPage = () => {
  const { data, status } = useQuery({
    ...closetQueryConfig.getClosetList(),
  })
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const navigate = useNavigate()
  const { openModal, closeModal } = useModals()

  const queryClient = useQueryClient()

  if (status === 'error' || !data?.result?.closetList) {
    return <div>error</div>
  }

  const handleDeleteCloset = (id: ClosetBoxModel['id']) => {
    openModal(DeleteReCheckModal, {
      handleCancel: () => {
        closeModal(DeleteReCheckModal)
      },
      handleConfirm: async () => {
        const serialized = Number(id)
        const res = await deleteCloset(serialized)
        if (res.isSuccess) setIsEdited(true)
        closeModal(DeleteReCheckModal)
        await queryClient.refetchQueries({ queryKey: ['get', 'closet', 'list'], exact: false })
      },
    })
  }

  const handleConfirm = () => {
    navigate('/closet')
  }

  return (
    <S.CreateRoot>
      <S.CreateHeaderContainer>
        <Header isModalHeader={false} hasArrow title={'옷장 정렬 및 삭제'}>
          <S.DeleteConfirmButton onClick={handleConfirm} disabled={!isEdited}>
            완료
          </S.DeleteConfirmButton>
        </Header>
      </S.CreateHeaderContainer>
      <S.BodyContainer>
        {data.result.closetList.map((closet) => {
          if (Number(closet.id) === 1) {
            return (
              <S.DeleteNameTagContainer key={closet.id}>
                <S.MockedIcon />
                <NameTag
                  key={closet.id}
                  service={{ closetBox: closet, editMode: false, isSortingLocation: true }}
                ></NameTag>
              </S.DeleteNameTagContainer>
            )
          }

          return (
            <S.DeleteNameTagContainer key={closet.id}>
              <DeleteIcon
                onClick={() => {
                  handleDeleteCloset(closet.id)
                }}
              />
              <NameTag
                key={closet.id}
                service={{ closetBox: closet, editMode: false, isSortingLocation: true }}
              ></NameTag>
            </S.DeleteNameTagContainer>
          )
        })}
      </S.BodyContainer>
    </S.CreateRoot>
  )
}

export default ClosetEditAndSortPage
