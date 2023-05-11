import styled from '@emotion/styled'

export const HashTagInput = styled.textarea`
  border: none;
  outline: none;
  font-family: 'Pretendard';
  font-size: 1rem;
  width: 100%;
  background-color: transparent;
  word-wrap: break-word;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  word-break: break-all;
  resize: none; /* disallow resizing */

  height: auto;
  line-height: 1.5em;
  max-height: 4.5em;

  &::placeholder {
    color: #999;
  }
`
