import styled from '@emotion/styled'
import { Common, Pretendard } from '../../../../components/styles'

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 1.5rem 1.25rem 1.25rem 1.25rem;
`

export const SubTitle = styled.span`
  padding-bottom: 1rem;
  ${Pretendard({ size: 18, weight: Common.bold.semiBold, color: Common.colors.BK })}
`

export const QuestionContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
  gap: 0.5rem;
`
export const Left = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`

export const QuestionIcon = styled.span`
  ${Pretendard({ size: 18, weight: Common.bold.regular, color: Common.colors.GR500 })}
`

export const QuestionTitle = styled.span`
  ${Pretendard({ size: 17, weight: Common.bold.regular, color: Common.colors.BK })}
`
export const AnswerContainer = styled.span`
  display: flex;
  gap: 0.5rem;
  /* align-items: center; */
  padding-top: 1.25rem;
  /* padding-left: 1.25rem; */
  line-height: 1.5625rem;
  ${Pretendard({ size: 17, weight: Common.bold.regular, color: Common.colors.BK })}
`

export const QuestionAnswer = styled.span`
  ${Pretendard({ size: 17, weight: Common.bold.regular, color: Common.colors.BK })}
`
export const BottomContainer = styled.div`
  padding: 0 1.25rem 1rem 1.25rem;
  position: relative;
  bottom: 0;
`
