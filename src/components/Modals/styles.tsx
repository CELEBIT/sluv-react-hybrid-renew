import styled from '@emotion/styled'
import { Common, Pretendard } from '../styles'

export const Dimmer = styled.div`
  width: 100%;
  height: 100vh;
`

export const Dimmed = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10;
`

export const BtnModalContainer = styled.div`
  display: flex;
  border-radius: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  width: 77%;
  margin: 0 11.5%;
  padding: 2rem 1.25rem 1.25rem 1.25rem;
  z-index: 30;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`

export const BtnModalContent = styled.p`
  ${Pretendard({
    size: 17,
    weight: Common.bold.regular,
    color: Common.colors.BK,
  })};
  /* line-height: 150%; */
  text-align: center;
`
