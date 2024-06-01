import styled from '@emotion/styled'
import { Common, Pretendard } from '../../components/styles'

export const CommunityPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  padding-left: 0;
  ::-webkit-scrollbar {
    display: none;
  }
  background-color: white;
  padding-bottom: 1.5625rem;
`
export const QuestionListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
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
