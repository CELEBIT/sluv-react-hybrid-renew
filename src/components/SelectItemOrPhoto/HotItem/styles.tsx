import styled from '@emotion/styled'

export const HotItemListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.4375rem;
`
export const ListWrapper = styled.div`
  display: grid;
  justify-items: center;
  flex-grow: none;
  padding: 0 1.25rem;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: minmax(0, auto);
  row-gap: 1.5rem;
  column-gap: 0.625rem;

  > div {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`
