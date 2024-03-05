import React, { useRef, useState, useMemo } from 'react'
import { InputContainer } from '../../../../../../components/TextField/DefaultTextfield/styles'
import styled from '@emotion/styled'
import { Common, Pretendard } from '../../../../../../components/styles'

interface ItemNameInputProps {
  value: string | undefined
  setValue: React.Dispatch<React.SetStateAction<string>>
  placeholder: string
}

const ItemNameInput = ({ value, setValue, placeholder }: ItemNameInputProps) => {
  const handleInputChange = useMemo(
    () => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value)
    },
    [setValue, value],
  )
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <InputContainer>
      <NameInputWrapper>
        <InputField
          value={value}
          placeholder={placeholder}
          ref={inputRef}
          autoFocus={false}
          onChange={handleInputChange}
        ></InputField>
      </NameInputWrapper>
    </InputContainer>
  )
}

export const NameInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 1rem 1.25rem;
`

const InputField = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  ${Pretendard({ size: 17, weight: Common.bold.thin, color: Common.colors.BK })}
  outline: none;
  border: none;
  padding: 0;
  background-color: white;
  caret-color: ${Common.colors.BK};
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
`

export default ItemNameInput
