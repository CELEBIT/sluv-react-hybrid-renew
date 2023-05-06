import styled from '@emotion/styled'
import { Common, Pretendard } from '../styles'

export const SelectCelebWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .selectSearch {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1.25rem;
    width: 100vw;
    margin-left: calc(-50vw + 50%);
  }
  .select {
    display: flex;
    position: relative;
    overflow-x: scroll;
    white-space: nowrap;
    box-sizing: border-box;
    padding-right: 1.25rem;
    gap: 0.5rem;
    & > *:last-child {
      margin-right: 5.625rem;
    }
    ::-webkit-scrollbar {
      display: none;
    }
  }
  .search {
    position: fixed;
    right: 1.25rem;
  }
`
export const Label = styled.span`
  ${Pretendard({ size: 18, weight: Common.bold.regular, color: Common.colors.BK })}
`
