import styled from '@emotion/styled'
import { Common, Pretendard } from '../../components/styles'

export const SelectCelebContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: -1.25rem;
  width: 100vw;
  height: 100vh;
  padding-left: 0;
  background-color: white;

  ::-webkit-scrollbar {
    display: none;
  }
`

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`

export const TitleSearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1.25rem 0 1.25rem;
  justify-content: space-between;
  gap: 1.25rem;
  ${Pretendard({
    size: 24,
    weight: Common.bold.semiBold,
    color: Common.colors.BK,
  })};
`
export const CelebCategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem 0;
`
export const CategoryContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 3.4375rem 0 1.25rem;
  width: 100%;
  height: 100%;
`
export const CategoryTitle = styled.span`
  padding: 1rem 0.25rem;
  ${Pretendard({
    size: 15,
    weight: Common.bold.regular,
    color: Common.colors.BK,
  })};
`
export const CelebListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem 12px;
  padding-bottom: 1rem;
  width: 100%;
  height: 100%;
`
