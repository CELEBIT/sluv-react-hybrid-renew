import styled from '@emotion/styled'
export const ChipWrapper = styled.div`
  display: flex;
  overflow-x: scroll;
  white-space: nowrap;
  box-sizing: border-box;
  margin-bottom: 1rem;
  gap: 1.0625rem;
  margin-left: calc(-1.25rem);
  padding-left: 1.25rem;
  margin-right: calc(-1.25rem);
  & > *:last-child {
    margin-right: 1.25rem;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`
export const SelectCategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
