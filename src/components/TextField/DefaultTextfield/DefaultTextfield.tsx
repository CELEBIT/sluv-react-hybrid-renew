import React, { useEffect, useRef, useState, useMemo } from 'react'
import { ErrorText, InputContainer, InputField, InputWrapper } from './styles'
import { ReactComponent as Delete } from '../../../assets/delete_textfield_24.svg'

interface DefaultTextFieldProps {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  onEnter?: () => void
  placeholder: string
  focusOnAppear?: boolean
  error?: boolean
  errorMsg?: string
}

const DefaultTextfield = ({
  value,
  setValue,
  onEnter,
  placeholder,
  focusOnAppear,
  error,
  errorMsg,
}: DefaultTextFieldProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const handleInputChange = useMemo(
    () => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value)
    },
    [setValue, value],
  )
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (onEnter) {
        onEnter()
      }
    }
  }
  const onDelete = (event: React.MouseEvent<SVGSVGElement>) => {
    event.stopPropagation()
    setValue('')
  }
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (focusOnAppear) inputRef?.current?.focus()
  }, [inputRef])

  return (
    <InputContainer>
      <InputWrapper onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}>
        <InputField
          value={value}
          placeholder={placeholder}
          ref={inputRef}
          autoFocus={false}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        ></InputField>
        {value && isFocused && (
          <Delete
            style={{ marginLeft: '0.625rem' }}
            onClick={onDelete}
            onMouseDown={onDelete}
          ></Delete>
        )}
      </InputWrapper>
      {error && <ErrorText>{errorMsg}</ErrorText>}
    </InputContainer>
  )
}

export default DefaultTextfield
