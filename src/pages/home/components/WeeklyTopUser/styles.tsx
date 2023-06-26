import styled from '@emotion/styled'

export const FilterListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 1.25rem;
  overflow-x: scroll;
  gap: 0.5rem;

  ::-webkit-scrollbar {
    display: none;
  }
`

export const UserCardListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  overflow-x: scroll;
  padding: 0.9375rem 1.25rem;
  gap: 11px;

  ::-webkit-scrollbar {
    display: none;
  }
`
