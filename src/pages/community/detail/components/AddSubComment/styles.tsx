import styled from '@emotion/styled'

export const AddSubCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  height: 100%;
  background-color: white;
  padding-bottom: 2rem;

  ::-webkit-scrollbar {
    display: none;
  }
`
