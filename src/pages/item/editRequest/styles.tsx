import styled from '@emotion/styled'
import { Common, Pretendard } from '../../../components/styles'

export const EditReportContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;
  padding-left: 0;
  background-color: white;
  /* padding-bottom: 3.125rem;/ */
  ::-webkit-scrollbar {
    display: none;
  }
`
export const ReasonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1.25rem;
`
export const EditReportListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 1rem;
`

export const Title = styled.span`
  padding: 0 0.25rem;
  margin-bottom: 1.25rem;
  ${Pretendard({ size: 18, weight: Common.bold.regular, color: Common.colors.BK })};
`
