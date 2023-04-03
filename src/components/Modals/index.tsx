import useModals from "./hooks/useModals";
import { Dimmed } from "./styles";
import React from 'react'

interface IDimmer {
  // onClick: <T>(args: T) => void;
  children: JSX.Element
}

const Dimmer = ({ children }: IDimmer) => {
  return <Dimmed>{children}</Dimmed>
}

// 모달 관리 객체
export const modalObj = {

};

const Modals = () => {
  const { modals, closeModal } = useModals();

  return (
    <>
      {modals.map(({ Component, props }, idx) => {
        const { onSubmit, ...restProps } = props;
        const onClose = () => {
          closeModal(Component);
        };
        const handleSubmit = async () => {
          if (typeof onSubmit === 'function') {
            await onSubmit();
          }
          onClose();
        }

        return (
          <Dimmer key={idx}>
            <Component 
              {...restProps}
              onSubmit={handleSubmit}
              onClose={onClose}
              {...props}
            />
          </Dimmer>
        )
      })}
    </>
  )
}

export default Modals; 


