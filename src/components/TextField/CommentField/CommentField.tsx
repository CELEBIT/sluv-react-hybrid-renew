import React, { useMemo } from 'react'
import { InputField } from '../DefaultTextfield/styles'

interface CommentFieldProps {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  onEnter?: () => void
  placeholder: string
}

const CommentField = ({ value, setValue, onEnter, placeholder }: CommentFieldProps) => {
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
  return (
    <InputField
      value={value}
      placeholder={placeholder}
      autoFocus={false}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
    ></InputField>
  )
}

export default CommentField
