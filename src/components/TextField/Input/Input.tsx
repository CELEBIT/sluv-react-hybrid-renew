import React, { useState } from 'react'
import { InputField } from '../DefaultTextfield/styles'
import { ReactComponent as Delete } from '../../../assets/delete_textfield_24.svg'

interface InputProps {
  value: string
  placeholder: string
  onChange: (value: string) => void
  onDelete: () => void
}

const Input = ({ value, placeholder, onChange, onDelete }: InputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }
  const [isFocused, setIsFocused] = useState(false)
  return (
    <>
      <InputField
        type='text'
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      ></InputField>
      {value.length !== 0 && isFocused && (
        <Delete
          style={{ marginLeft: '0.625rem' }}
          onClick={onDelete}
          onMouseDown={onDelete}
        ></Delete>
      )}
    </>
  )
}

export default Input
