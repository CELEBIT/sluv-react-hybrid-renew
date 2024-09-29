import styled from '@emotion/styled'
import React from 'react'

interface BottomSheetModalProps {
  children: React.ReactNode
}

const BottomSheetModal = ({ children }: BottomSheetModalProps) => {
  return <BottomSheetModalContainer>{children}</BottomSheetModalContainer>
}

export default BottomSheetModal

const BottomSheetModalContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  z-index: 500;
  border-radius: 20px 20px 0px 0px;
`
