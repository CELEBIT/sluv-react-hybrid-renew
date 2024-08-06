import React, { ReactNode } from 'react'
import styled from '@emotion/styled'
import { Common, Pretendard } from '../../../../../components/styles'
import ButtonLarge from '../../../../../components/ButtonLarge/ButtonLarge'
import { modals } from '../../../../../components/Modals'
import useModals from '../../../../../components/Modals/hooks/useModals'

interface CommentBlurProps {
  children?: ReactNode
}

const CommentBlur = ({ children }: CommentBlurProps) => {
  const { openModal } = useModals()
  const onCLickLogin = () => {
    openModal(modals.LoginToContinueModal)
  }

  return (
    <Layout>
      <Title>
        셀럽 아이템 정보가 궁금하다면
        <br />
        스럽에서 찾아보세요!
      </Title>
      <ButtonWrapper>
        <ButtonLarge text='스럽 로그인하기' active={true} onClick={onCLickLogin}></ButtonLarge>
      </ButtonWrapper>
      {children}
    </Layout>
  )
}

export default CommentBlur

const Layout = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 100%;
  background: #ffffffb2;
  backdrop-filter: blur(4px);
  z-index: 20;
  top: 0;
`

const Title = styled.span`
  width: 15.6875rem;
  ${Pretendard({ size: 17, weight: Common.bold.regular, color: Common.colors.BK })}
`
const ButtonWrapper = styled.div`
  width: 12.5rem;
`
