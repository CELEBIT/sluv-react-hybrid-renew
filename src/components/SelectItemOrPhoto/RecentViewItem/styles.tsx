import styled from '@emotion/styled'

export const RecentViewItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.25rem;

  .full {
    width: 100vw;
    margin-left: calc(-50vw + 50%);
  }
`
export const ListWrapper = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: minmax(0, auto);
  row-gap: 1.5rem;
  column-gap: 0.625rem;
  padding-bottom: 1.875rem;

  > div {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`
