import styled from '@emotion/styled'
import { Common, Pretendard } from '../../../../components/styles'

interface WriteQuestionButtonProps {
  hasButtonText?: boolean
}

export const WriteCommunityItemButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 70px;
  right: 1.25rem;
  z-index: 60;
`

export const WriteQuestionButton = styled.div<WriteQuestionButtonProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 0.375rem;
  background-color: ${Common.colors.BK};
  border-radius: 6.25rem;
  padding: ${(props) => (props.hasButtonText ? '0.75rem 1.25rem' : '0.75rem')};
  transition: ease-in-out 5ms;
`

export const ButtonText = styled.span`
  ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.WH })}
`
