import useModals from './hooks/useModals';
import { Dimmed, Dimmer } from './styles';
import React from 'react';
import { ComponentProps, FunctionComponent } from 'react'
import loadable from '@loadable/component'

const AskRecentPostWritingModal = loadable(() => import('../TwoButtonModal/AskRecentPostWritingModal'));

// 모달 관리 객체
export const modalObj = {
  AskRecentPostWritingModal: AskRecentPostWritingModal as FunctionComponent<
    ComponentProps<typeof AskRecentPostWritingModal>
  >
};

const Modals = () => {
  const { modals, closeModal } = useModals();

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
        const onClose = (callbackFunc?: Function) => {
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

export default Modals; 


