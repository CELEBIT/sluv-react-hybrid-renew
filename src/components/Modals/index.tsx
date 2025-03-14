import useModals from './hooks/useModals'
import { Dimmed, Dimmer } from './styles'
import React, { ComponentProps, FunctionComponent, memo } from 'react'
import loadable from '@loadable/component'
import PropTypes from 'prop-types'
import { QuestionChangeModalProps } from '../TwoButtonModal/QuestionChangeModal'
import { CommunityMenu } from '../../config/communityMenu'
import ClosetBoxCreateBottomSheetModal from '../BottomSheetModal/ClosetBoxCreateBottomSheetModal'
import { userIdProps } from '../BottomSheetModal/UserInterestCelebModal'

const AskRecentPostWritingModal = loadable(
  () => import('../TwoButtonModal/AskRecentPostWritingModal'),
)
const ItemDatePickerModal = loadable(() => import('../BottomSheetModal/ItemDatePickerModal'))
const ItemPlaceInputModal = loadable(
  () => import('../BottomSheetModal/ItemPlaceInputModal/ItemPlaceInputModal'),
)
const ItemBrandSelectModal = loadable(
  () => import('../BottomSheetModal/ItemBrandSelectModal/ItemBrandSelectModal'),
)
const ItemNameInputModal = loadable(() => import('../BottomSheetModal/ItemNameInputModal'))
const ItemCategoryModal = loadable(() => import('../BottomSheetModal/ItemCategoryModal'))
const ItemCelebSelectModal = loadable(
  () => import('../BottomSheetModal/ItemCelebModal/ItemCelebSelectModal'),
)
const ItemCelebSearchModal = loadable(
  () => import('../BottomSheetModal/ItemCelebModal/ItemCelebSearchModal'),
)
const ItemEditModal = loadable(() => import('../BottomSheetModal/ItemEditModal'))
const ItemEditRequestModal = loadable(() => import('../BottomSheetModal/ItemEditRequestModal'))
const EditRequestCompleteModal = loadable(
  () => import('../OneButtonModal/EditRequestCompleteModal'),
)
const UserReportCompleteModal = loadable(() => import('../OneButtonModal/UserReportCompleteModal'))
const DuplicateReportModal = loadable(() => import('../OneButtonModal/DuplicateReportModal'))

const QuestionDateTimePickerModal = loadable(
  () => import('../BottomSheetModal/QuestionDateTimePickerModal'),
)
const QuestionChangeModal = loadable(() => import('../TwoButtonModal/QuestionChangeModal'))
const CommunityTabChangeModal = loadable(() => import('../TwoButtonModal/CommunityTabChangeModal'))
const QuestionReportModal = loadable(() => import('../BottomSheetModal/QuestionReportModal'))
const ReportQuestionCompleteModal = loadable(
  () => import('../OneButtonModal/ReportQuestionCompleteModal'),
)
const ReportCommentCompleteModal = loadable(
  () => import('../OneButtonModal/ReportCommentCompleteModal'),
)
const QuestionEditDeleteModal = loadable(
  () => import('../BottomSheetModal/QuestionEditDeleteModal'),
)
const DeleteItemModal = loadable(() => import('../TwoButtonModal/DeleteItemModal'))
const DeleteTempItemModal = loadable(() => import('../TwoButtonModal/DeleteTempItemModal'))
const DeleteQuestionModal = loadable(() => import('../TwoButtonModal/DeleteQuestionModal'))

// 관심셀럽 선택 모달
const SelectedInterestCelebModal = loadable(
  () => import('../BottomSheetModal/SelectedInterestCelebModal'),
)

const UserInterestCelebModal = loadable(() => import('../BottomSheetModal/UserInterestCelebModal'))
const UserModal = loadable(() => import('../BottomSheetModal/UserModal'))
const CommentEditModal = loadable(() => import('../BottomSheetModal/CommentEditModal'))
const SubCommentEditModal = loadable(() => import('../BottomSheetModal/SubCommentEditModal'))
const DeleteCommentModal = loadable(() => import('../TwoButtonModal/DeleteCommentModal'))
const CommentReportModal = loadable(() => import('../BottomSheetModal/CommentReportModal'))
const LogoutModal = loadable(() => import('../TwoButtonModal/LogoutModal'))
const LoginToContinueModal = loadable(() => import('../TwoButtonModal/LoginToContinueModal'))
const ConfirmWithdrawModal = loadable(() => import('../OneButtonModal/ConfirmWithdrawModal'))

const ProfileImgModal = loadable(() => import('../BottomSheetModal/ProfileImgModal'))
// 모달 관리 객체
export const modals = {
  AskRecentPostWritingModal: AskRecentPostWritingModal as FunctionComponent<
    ComponentProps<typeof AskRecentPostWritingModal>
  >,
  ItemDatePickerModal: ItemDatePickerModal as FunctionComponent<
    ComponentProps<typeof ItemDatePickerModal>
  >,
  ItemPlaceInputModal: ItemPlaceInputModal as FunctionComponent<
    ComponentProps<typeof ItemPlaceInputModal>
  >,
  ItemBrandSelectModal: ItemBrandSelectModal as FunctionComponent<
    ComponentProps<typeof ItemBrandSelectModal>
  >,
  ItemNameInputModal: ItemNameInputModal as FunctionComponent<
    ComponentProps<typeof ItemNameInputModal>
  >,
  ItemCategoryModal: ItemCategoryModal as FunctionComponent<
    ComponentProps<typeof ItemCategoryModal>
  >,
  ItemCelebSelectModal: ItemCelebSelectModal as FunctionComponent<
    ComponentProps<typeof ItemCelebSelectModal>
  >,
  ItemCelebSearchModal: ItemCelebSearchModal as FunctionComponent<
    ComponentProps<typeof ItemCelebSearchModal>
  >,
  ItemEditRequestModal: ItemEditRequestModal as FunctionComponent<
    ComponentProps<typeof ItemEditRequestModal>
  >,
  ItemEditModal: ItemEditModal as FunctionComponent<ComponentProps<typeof ItemEditModal>>,
  DeleteItemModal: DeleteItemModal as FunctionComponent<ComponentProps<typeof DeleteItemModal>>,
  EditRequestCompleteModal: EditRequestCompleteModal as FunctionComponent<
    ComponentProps<typeof EditRequestCompleteModal>
  >,
  DuplicateReportModal: DuplicateReportModal as FunctionComponent<
    ComponentProps<typeof DuplicateReportModal>
  >,
  UserReportCompleteModal: UserReportCompleteModal as FunctionComponent<
    ComponentProps<typeof UserReportCompleteModal>
  >,
  QuestionDateTimePickerModal: QuestionDateTimePickerModal as FunctionComponent<
    ComponentProps<typeof QuestionDateTimePickerModal>
  >,
  QuestionChangeModal: QuestionChangeModal as FunctionComponent<QuestionChangeModalProps>,
  CommunityTabChangeModal: CommunityTabChangeModal as FunctionComponent<CommunityMenu>,
  DeleteTempItemModal: DeleteTempItemModal as FunctionComponent<
    ComponentProps<typeof DeleteTempItemModal>
  >,
  QuestionReportModal: QuestionReportModal as FunctionComponent<
    ComponentProps<typeof QuestionReportModal>
  >,
  ReportQuestionCompleteModal: ReportQuestionCompleteModal as FunctionComponent<
    ComponentProps<typeof ReportQuestionCompleteModal>
  >,
  ReportCommentCompleteModal: ReportCommentCompleteModal as FunctionComponent<
    ComponentProps<typeof ReportCommentCompleteModal>
  >,
  QuestionEditDeleteModal: QuestionEditDeleteModal as FunctionComponent<
    ComponentProps<typeof QuestionEditDeleteModal>
  >,
  DeleteQuestionModal: DeleteQuestionModal as FunctionComponent<
    ComponentProps<typeof DeleteQuestionModal>
  >,
  SelectedInterestCelebModal: SelectedInterestCelebModal as FunctionComponent<
    ComponentProps<typeof SelectedInterestCelebModal>
  >,
  ClosetBoxSelectCoverModal: ClosetBoxCreateBottomSheetModal as FunctionComponent<
    ComponentProps<typeof ClosetBoxCreateBottomSheetModal>
  >,
  UserInterestCelebModal: UserInterestCelebModal as FunctionComponent<userIdProps>,
  UserModal: UserModal as FunctionComponent<ComponentProps<typeof UserModal>>,
  CommentEditModal: CommentEditModal as FunctionComponent<ComponentProps<typeof CommentEditModal>>,
  SubCommentEditModal: SubCommentEditModal as FunctionComponent<
    ComponentProps<typeof SubCommentEditModal>
  >,

  DeleteCommentModal: DeleteCommentModal as FunctionComponent<
    ComponentProps<typeof DeleteCommentModal>
  >,
  CommentReportModal: CommentReportModal as FunctionComponent<
    ComponentProps<typeof CommentReportModal>
  >,
  LogoutModal: LogoutModal as FunctionComponent<ComponentProps<typeof LogoutModal>>,
  LoginToContinueModal: LoginToContinueModal as FunctionComponent<
    ComponentProps<typeof LoginToContinueModal>
  >,
  ConfirmWithdrawModal: ConfirmWithdrawModal as FunctionComponent<
    ComponentProps<typeof ConfirmWithdrawModal>
  >,
  ProfileImgModal: ProfileImgModal as FunctionComponent<ComponentProps<typeof ProfileImgModal>>,
}

const Modals = () => {
  const { modalList, closeModal } = useModals()
  return (
    <>
      {modalList.map(({ Component, props }, idx) => {
        const { onSubmit, ...restProps } = props
        const clickDimmed = () => {
          if (props.callbackFunc) {
            closeModal(Component, props.callbackFunc)
          } else {
            closeModal(Component)
          }
        }
        const onClose = (callbackFunc?: () => void) => {
          if (callbackFunc) {
            closeModal(Component, callbackFunc)
          } else {
            closeModal(Component)
          }
        }
        const handleSubmit = async () => {
          if (typeof onSubmit === 'function') {
            await onSubmit()
          }
          onClose()
        }

        return (
          <Dimmer key={idx}>
            <Dimmed onClick={() => clickDimmed()} />
            <Component {...restProps} onSubmit={handleSubmit} onClose={onClose} {...props} />
          </Dimmer>
        )
      })}
    </>
  )
}

export default memo(Modals)

Modals.propTypes = {
  onSubmit: PropTypes.func,
  callbackFunc: PropTypes.func,
}
