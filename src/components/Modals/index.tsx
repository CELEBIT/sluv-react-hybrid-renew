import useModals from './hooks/useModals'
import { Dimmed, Dimmer } from './styles'
import React, { ComponentProps, FunctionComponent } from 'react'
import loadable from '@loadable/component'
import PropTypes from 'prop-types'

const AskRecentPostWritingModal = loadable(
  () => import('../TwoButtonModal/AskRecentPostWritingModal'),
)
const ItemDatePickerModal = loadable(() => import('../BottomSheetModal/ItemDatePickerModal'))

// 모달 관리 객체
export const modals = {
  AskRecentPostWritingModal: AskRecentPostWritingModal as FunctionComponent<
    ComponentProps<typeof AskRecentPostWritingModal>
  >,
  ItemDatePickerModal: ItemDatePickerModal as FunctionComponent<
    ComponentProps<typeof ItemDatePickerModal>
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
