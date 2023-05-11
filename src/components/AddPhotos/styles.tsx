import styled from '@emotion/styled'

export const AddPhotosWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow-x: scroll;
  padding-top: 1rem;
  gap: 0.75rem;
  ::-webkit-scrollbar {
    display: hidden;
    height: 0;
    width: 0;
  }
`
