import styled from '@emotion/styled'
import { Common } from '../../styles'

export const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const TextAreaWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;

  text-align: left;

  height: auto;
  max-width: 20.9375rem;
  border: 1px solid ${Common.colors.GR200};
  border-radius: 0.5rem;
  padding: 1rem;

  :focus {
    border: 1px solid ${Common.colors.BK};
  }
  &:focus-within {
    border: 1px solid ${Common.colors.BK};
  }
`
export const Textarea = styled.textarea`
  height: 11.75rem;
  width: 100%;
  font-family: Pretendard;
  font-size: 1.0625rem;
  font-weight: 400;
  line-height: 1.5625rem;
  padding: 0;
  border: 0;
  outline: none;
  resize: none;
  &::-webkit-scrollbar {
    display: none;
  }
  ::placeholder {
    color: ${Common.colors.GR500};
  }
`
