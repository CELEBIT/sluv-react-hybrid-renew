import styled from '@emotion/styled'
export const SubComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 2.5rem;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  padding-bottom: 1.25rem;
  /* padding-bottom: 5.625rem; */
  ::-webkit-scrollbar {
    display: none;
  }
  .padding {
    padding: 0 1.25rem;
  }
`
