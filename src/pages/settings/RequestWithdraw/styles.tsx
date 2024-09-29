import styled from '@emotion/styled'
import { Common, Pretendard } from '../../../components/styles'

export const EditReportContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`
export const ConfirmWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`
export const ConfirmTitle = styled.span`
  padding: 1.5rem 1.25rem;
  ${Pretendard({ size: 24, weight: Common.bold.regular, color: Common.colors.BK })}
`
export const AgreementBg = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: 1.5rem 1.25rem 0.75rem 1.25rem;
  background-color: ${Common.colors.GR50};
  gap: 1.5rem;
`

export const Agreement = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const EachContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

export const AgreeTitle = styled.span`
  ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.BK })}
`
export const AgreeDetail = styled.span`
  ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.GR600 })}
  line-height: 23px;
`

export const ReasonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 1.5rem 1.25rem;
`
export const EditReportListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 0.75rem;
`

export const Title = styled.span`
  padding: 0 0.25rem;
  margin-bottom: 1.25rem;
  ${Pretendard({ size: 18, weight: Common.bold.regular, color: Common.colors.BK })};
`
