import styled from '@emotion/styled'

export const ConfirmContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
`
export const PhotosWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
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
export const ItemWrapper = styled.div`
  display: flex;
  /* border: 1px solid blue; */
  flex-direction: column;
  height: 100%;
  gap: 2.5rem;
  overflow-y: scroll;
  padding-bottom: 2.5rem;
  ::-webkit-scrollbar {
    display: none;
  }
  .padding {
    padding: 0 1.25rem;
  }
`

export const ConfirmButtonWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  gap: 0.5625rem;
  width: 100%;
  background-color: white;
  padding: 0.75rem 1.25rem;
`
