import TwoButtonModal from '.'
import useReportUserQuery from '../../apis/user/hooks/useReportUserQuery'
import { modals } from '../Modals'
import useModals from '../Modals/hooks/useModals'
import { BtnModalContent } from '../Modals/styles'

export interface BlockUserModalProps {
  userId: number
  blockStatus: boolean
}

const BlockUserModal = ({ userId, blockStatus }: BlockUserModalProps) => {
  const { closeModal } = useModals()
  const {
    blockUser: { mutate: mutateBlockUser },
  } = useReportUserQuery()

  const onToggleBlock = () => {
    closeModal(modals.BlockUserModal, () => {
      mutateBlockUser(userId)
    })
  }

  return (
    <TwoButtonModal
      leftButtonName='취소하기'
      rightButtonName={blockStatus ? '해제하기' : '차단하기'}
      leftButtonOnClick={() => closeModal(modals.BlockUserModal)}
      rightButtonOnClick={onToggleBlock}
    >
      <BtnModalContent>
        {blockStatus ? '차단 해제 하실 건가요?' : '차단하실 건가요?'}
        <br />
        {blockStatus
          ? '사용자의 게시글을 다시 볼 수 있어요'
          : '사용자의 모든 게시글을 볼 수 없어요'}
      </BtnModalContent>
    </TwoButtonModal>
  )
}

export default BlockUserModal
