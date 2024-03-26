import styled from '@emotion/styled'
import { Common, Pretendard } from '../../components/styles'

export const CommunityPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-left: -1.25rem;
  width: 100vw;
  height: 100vh;
  padding-left: 0;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`
export const QuestionListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 3.125rem;
  .title {
    padding: 0 1.25rem;
    ${Pretendard({ size: 18, weight: Common.bold.semiBold, color: Common.colors.BK })}
  }
`

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100% - 40px);
`

export const TabContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  overflow-x: scroll;
  padding: 1rem 1.25rem 0.75rem 1.25rem;
  gap: 0.375rem;

  ::-webkit-scrollbar {
    display: none;
  }
`
