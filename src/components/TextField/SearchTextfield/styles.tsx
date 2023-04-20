import styled from 'styled-components'
import { Common } from '../../styles'

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  height: 3.5rem;
  width: 100%;
  border: 1px solid ${Common.colors.GR200};
  border-radius: 0.5rem;
  padding: 1rem 1.25rem;
  :focus {
    border: 1px solid ${Common.colors.BK};
  }
  &:focus-within {
    border: 1px solid ${Common.colors.BK};
  }
`

export const InputField = styled.input`
  display: inline-flex;
  align-items: center;
  height: 1.25rem;
  font-size: 1.0625rem;
  font-weight: 400;
  font-family: Pretendard;
  outline: none;
  border: none;
  padding: 0;
  background-color: white;
  caret-color: ${Common.colors.BK};

  &:disabled {
    ::placeholder {
      color: ${Common.colors.GR500};
    }
    cursor: not-allowed;
  }
  ::placeholder {
    color: ${Common.colors.GR500};
  }

  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  :-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px #fff inset;
    -webkit-text-fill-color: ${Common.colors.BK};
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
  }
  &:focus {
    background-color: white;
  }
`
export const ErrorText = styled.span`
  font-size: 0.875rem;
  font-weight: ${Common.bold.regular};
  font-family: Pretendard;
  color: ${Common.colors.ERROR};
  margin-top: 0.5rem;
`
