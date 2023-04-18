import React, { useState } from 'react'
import { ErrorText, InputField, InputWrapper } from './styles'
import { ReactComponent as Delete } from '../../../assets/delete_textfield_24.svg'

interface DefaultTextFieldProps {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  onEnter: () => void
  placeholder: string
  error?: boolean
  errorMsg?: string
}

const DefaultTextfield = ({
  value,
  setValue,
  onEnter,
  placeholder,
  error,
  errorMsg,
}: DefaultTextFieldProps) => {
  const [isFocused, setIsFocused] = useState(false)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    console.log('value:', value)
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (onEnter) {
        onEnter()
      }
    }
  }
  const onDelete = () => {
    setValue('')
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <InputWrapper onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}>
        <InputField
          value={value}
          placeholder={placeholder}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        ></InputField>
        {value.length !== 0 && isFocused && (
          <Delete
            style={{ marginLeft: '0.625rem' }}
            onClick={onDelete}
            onMouseDown={onDelete}
            onTouchStart={onDelete}
          ></Delete>
        )}
      </InputWrapper>
      {error && <ErrorText>{errorMsg}</ErrorText>}
    </div>
  )
}

export default DefaultTextfield
