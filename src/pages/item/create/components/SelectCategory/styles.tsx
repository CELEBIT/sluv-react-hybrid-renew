import styled from '@emotion/styled'
export const ChipWrapper = styled.div`
  display: flex;
  overflow-x: scroll;
  white-space: nowrap;
  box-sizing: border-box;
  gap: 1.0625rem;
  height: auto;
  padding: 0 1.25rem;
  /* & > *:last-child {
    margin-right: 1.25rem;
  } */
  ::-webkit-scrollbar {
    display: none;
  }
`
export const SelectCategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
