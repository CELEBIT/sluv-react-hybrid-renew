import styled from '@emotion/styled'
import { Common, Pretendard } from '../../../../../components/styles'

export const PriceFieldWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 4.1875rem;
  width: calc(100%-1.25rem);
  gap: 0.6875rem;
  margin: 0 1.25rem;
  background-color: white;
  border: 1px solid ${Common.colors.GR200};
  border-radius: 0.5rem;
  padding: 0.75rem 1rem 0.75rem 1.25rem;
  :focus {
    border: 1px solid ${Common.colors.BK};
  }
  &:focus-within {
    border: 1px solid ${Common.colors.BK};
  }
`

export const PriceInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  .valueText {
    ${Pretendard({
      size: 14,
      weight: Common.bold.regular,
      color: Common.colors.SEC,
    })}
  }
  .labelText {
    ${Pretendard({
      size: 14,
      weight: Common.bold.regular,
      color: Common.colors.GR600,
    })}
  }
`

export const InputFieldWrapper = styled.div`
  width: 100%;
  span {
    margin-bottom: 0.25rem;
    ${Pretendard({
      size: 17,
      weight: Common.bold.thin,
      color: Common.colors.GR500,
    })}
  }
`

export const PriceInputField = styled.input`
  box-sizing: border-box;
  padding: 0 0 0.25rem 0;
  /* width: 100%; */
  width: ${({ value }) => `${(value?.toString()?.length || 1.3) + 0.5}ch`};
  ${Pretendard({
    size: 17,
    weight: Common.bold.thin,
    color: Common.colors.BK,
  })}
  outline: none;
  border: none;
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
  ${Pretendard({
    size: 17,
    weight: Common.bold.regular,
    color: Common.colors.BK,
  })}
`
export const LabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

export const WonText = styled.span`
  display: inline-block;
  padding-left: 0.25rem;
  color: ${Common.colors.BK} !important;
  ${Pretendard({
    size: 17,
    weight: Common.bold.regular,
    color: Common.colors.BK,
  })};
`
