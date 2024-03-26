import styled from '@emotion/styled'

export const SelectCelebWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-right: 1.25rem;
  .select {
    display: flex;
    position: relative;
    overflow-x: scroll;
    white-space: nowrap;
    box-sizing: border-box;
    padding: 0 1.25rem;
    gap: 0.5rem;
    & > *:last-child {
      margin-right: 4.375rem;
    }
    ::-webkit-scrollbar {
      display: none;
    }
  }
  .search {
    display: flex;
    flex-direction: row;
    position: absolute;
    right: 0;
    overflow-wrap: 0;
    padding-left: 0.5rem;
    padding-right: 1.25rem;
    background: linear-gradient(90deg, #ffffffe1 11.79%, #ffffff 50.18%, #ffffff 79.72%);
  }
`
