import styled from '@emotion/styled'

export const SelectCelebWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  .select {
    display: flex;
    position: relative;
    overflow-x: scroll;
    white-space: nowrap;
    box-sizing: border-box;
    padding-right: 1.25rem;
    gap: 0.5rem;
    & > *:last-child {
      margin-right: 4.375rem;
    }
    ::-webkit-scrollbar {
      display: none;
    }
  }
  .search {
    position: absolute;
    right: 0;
    overflow-wrap: 0;
    /* margin-right: calc(1.25rem); */
  }
`
