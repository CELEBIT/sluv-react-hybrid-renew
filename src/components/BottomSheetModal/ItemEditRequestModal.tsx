import styled from '@emotion/styled'
import BottomSheetModal from '.'

import { useRecoilValue } from 'recoil'
// import { atomKeys } from '../../config/atomKeys'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as Report } from '../../assets/BottomModal/siren_24.svg'
import { ReactComponent as Speaker } from '../../assets/BottomModal/speaker_24.svg'
import { RequestEditItemState } from '../../pages/item/editRequest'
import Header from '../Header/Header'
import { modals } from '../Modals'
import useModals from '../Modals/hooks/useModals'
import { Common, Pretendard } from '../styles'

const ItemEditRequestModal = () => {
  const navigate = useNavigate()
  const { closeModal } = useModals()
  const onClickEditRequest = () => {
    closeModal(modals.ItemEditRequestModal, () => {
      navigate('/item/detail/request-edit')
    })
  }
  const onClickReportItem = () => {
    closeModal(modals.ItemEditRequestModal, () => {
      navigate('/item/detail/report-item')
    })
  }
  const onClickReportUser = () => {
    closeModal(modals.ItemEditRequestModal, () => {
      navigate('/item/detail/report-user')
    })
  }
  const EditReportItem = useRecoilValue(RequestEditItemState)
  return (
    <BottomSheetModal>
      <ModalWrapper>
        <Header
          isModalHeader={true}
          modalCloseBtnClick={() => closeModal(modals.ItemEditRequestModal)}
        />
        <MenuWrapper>
          <Menu onClick={onClickEditRequest}>
            <Speaker stroke={Common.colors.BK}></Speaker>정보 수정 요청하기
          </Menu>
          <Menu onClick={onClickReportItem}>
            <Report stroke={Common.colors.BK}></Report>게시글 신고하기
          </Menu>
          <Menu onClick={onClickReportUser}>
            <Report stroke={Common.colors.BK}></Report>
            &apos;{EditReportItem.itemWriterName}&apos;님 신고하기
          </Menu>
        </MenuWrapper>
      </ModalWrapper>
    </BottomSheetModal>
  )
}

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 1.25rem 0.75rem 2rem;
`
const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const Menu = styled.div`
  display: flex;
  align-items: center;
  padding: 0.875rem 0;
  gap: 0.625rem;
  ${Pretendard({ size: 17, weight: Common.bold.regular, color: Common.colors.BK })}
`

export default ItemEditRequestModal
