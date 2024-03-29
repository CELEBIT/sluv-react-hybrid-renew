import styled from '@emotion/styled'

export const AddPhotosWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  /* height: 18.75rem; */
  overflow-x: scroll;
  padding-top: 1rem;
  gap: 0.75rem;

  padding-left: 1.25rem;
  padding-right: 1.25rem;
  ::-webkit-scrollbar {
    display: hidden;
    height: 0;
    width: 0;
  }

  .row {
    display: flex;
    flex-direction: row;
    gap: 0.75rem;
  }
`
