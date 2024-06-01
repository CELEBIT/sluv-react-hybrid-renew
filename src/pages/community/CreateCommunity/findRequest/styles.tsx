import styled from '@emotion/styled'

export const FindRequestContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;
  padding-left: 0;
  background-color: white;
  /* padding-bottom: 3.125rem;/ */
  ::-webkit-scrollbar {
    display: none;
  }
`

export const ComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 2.5rem;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  padding-top: 1.5rem;
  padding-bottom: 1.25rem;
  /* padding-bottom: 5.625rem; */
  ::-webkit-scrollbar {
    display: none;
  }
  .padding {
    padding: 0 1.25rem;
  }
`
