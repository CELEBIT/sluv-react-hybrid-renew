import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import styled from '@emotion/styled'
import BottomSheetModal from '..'
import { modals } from '../../Modals'
import useModals from '../../Modals/hooks/useModals'
import { Common, Pretendard } from '../../styles'
import { ChipWrapper } from '../ItemBrandSelectModal/ItemBrandSelectModal'
import { ButtonWrapper } from '../ItemPlaceInputModal/ItemPlaceInputModal'
import Header from '../../Header/Header'
import ButtonMedium from '../../ButtonMedium/ButtonMedium'
import ButtonLarge from '../../ButtonLarge/ButtonLarge'
import { selectedCelebState, selectedGroupState } from '../../SelectCeleb/SelectCeleb'
import { ICelebResult } from '../../../apis/user/userService'
import { celebInfoInItemState, itemInfoState } from '../../../recoil/itemInfo'
import useRecentCelebQuery from '../../../apis/celeb/hooks/useRecentCelebQuery'

const ItemCelebSelectModal = () => {
  const {
    postRecentCeleb: { mutate: mutateByPostRecentCeleb },
  } = useRecentCelebQuery()

  const selectedGroup = useRecoilValue(selectedGroupState)
  const [selectedCeleb, setSelectedCeleb] = useRecoilState(selectedCelebState)
  const [celebInfoInItem, setCelebInfoInItem] = useRecoilState(celebInfoInItemState)
  const [itemInfo, setItemInfo] = useRecoilState(itemInfoState)

  const { closeModal } = useModals()
  const onClose = () => {
    closeModal(modals.ItemCelebSelectModal)
  }
  const onComplete = () => {
    mutateByPostRecentCeleb(
      { celebId: selectedCeleb.id, newCelebId: null },
      {
        onSuccess: () => {
          closeModal(modals.ItemCelebSelectModal, () => {
            setCelebInfoInItem({
              ...celebInfoInItem,
              soloId: selectedCeleb.id,
              soloName: selectedCeleb.celebNameKr,
            })
            setItemInfo({
              ...itemInfo,
              celeb: {
                celebId: selectedCeleb.id,
                celebName: selectedCeleb.celebNameKr,
              },
            })
          })
        },
      },
    )
  }
  const onClickMember = (member: ICelebResult) => {
    setSelectedCeleb(member)
  }
  return (
    <BottomSheetModal>
      <ModalWrapper>
        <div className='Header'>
          <Header title='셀럽선택' isModalHeader={true} modalCloseBtnClick={onClose} />
        </div>
        <SelectWrapper>
          <span className='GroupName'>{selectedGroup?.celebNameKr}</span>
          <MemberWrapper>
            {selectedGroup?.subCelebList &&
              selectedGroup?.subCelebList.map((celeb) => {
                return (
                  <ButtonMedium
                    key={celeb.id}
                    text={celeb.celebNameKr}
                    type='pri'
                    active={selectedCeleb === celeb}
                    onClick={() => onClickMember(celeb)}
                  ></ButtonMedium>
                )
              })}
          </MemberWrapper>
          <ChipWrapper></ChipWrapper>
        </SelectWrapper>
        <ButtonWrapper>
          <ButtonLarge
            text='완료'
            active={selectedCeleb.id !== 0}
            onClick={onComplete}
          ></ButtonLarge>
        </ButtonWrapper>
      </ModalWrapper>
    </BottomSheetModal>
  )
}

export default ItemCelebSelectModal

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .Header {
    padding: 0 1.25rem;
  }
  .long {
    height: 34.875rem;
  }
`
const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1.25rem;
  padding: 0.5625rem 1.25rem;
  .GroupName {
    ${Pretendard({
      size: 18,
      weight: Common.bold.regular,
      color: Common.colors.BK,
    })}
    margin: 0 0 0.875rem 0;
  }
`

export const MemberWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 0.5rem;
`
