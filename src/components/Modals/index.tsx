import useModals from './hooks/useModals'
import { Dimmed, Dimmer } from './styles'
import React, { ComponentProps, FunctionComponent } from 'react'
import loadable from '@loadable/component'
import PropTypes from 'prop-types'

const AskRecentPostWritingModal = loadable(
  () => import('../TwoButtonModal/AskRecentPostWritingModal'),
)
const ItemDatePickerModal = loadable(() => import('../BottomSheetModal/ItemDatePickerModal'))
const ItemPlaceInputModal = loadable(() => import('../BottomSheetModal/ItemPlaceInputModal'))
const ItemBrandSelectModal = loadable(
  () => import('../BottomSheetModal/ItemBrandSelectModal/ItemBrandSelectModal'),
)
const ItemNameInputModal = loadable(() => import('../BottomSheetModal/ItemNameInputModal'))
const ItemCategoryModal = loadable(() => import('../BottomSheetModal/ItemCategoryModal'))

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
}

const Modals = () => {
  const { modals, closeModal } = useModals()
  return (
    <>
      {modals.map(({ Component, props }, idx) => {
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

export default Modals

Modals.propTypes = {
  onSubmit: PropTypes.func,
  callbackFunc: PropTypes.func,
}
