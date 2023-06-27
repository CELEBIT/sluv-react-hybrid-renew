import styled from '@emotion/styled'
import { Common, Pretendard } from '../../components/styles'

export const CommunityContainer = styled.div`
  display: flex;
  flex-direction: column;
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
  padding-bottom: 4rem;
  overflow-y: scroll;
  .title {
    padding: 0 1.25rem;
    ${Pretendard({ size: 18, weight: Common.bold.semiBold, color: Common.colors.BK })}
  }
`
