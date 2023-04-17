import React, { useState } from 'react'
import { TextAreaContainer, TextAreaWrapper, Textarea } from './styles'
import { ReactComponent as Delete } from '../../../assets/delete_textfield_24.svg'
import { ErrorText } from '../DefaultTextfield/styles'
interface TextAreaProps {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  placeholder: string
  error: boolean
  errorMsg: string
}

const TextArea = ({ value, setValue, placeholder, error, errorMsg }: TextAreaProps) => {
  const [isFocused, setIsFocused] = useState(false)
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value)
    console.log('value:', value)
  }
  const onDelete = () => {
    setValue('')
  }
  return (
    <TextAreaContainer>
      <TextAreaWrapper onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}>
        <Textarea
          value={value}
          placeholder={placeholder}
          onChange={handleInputChange}
          maxLength={300}
        ></Textarea>
        {value.length !== 0 && isFocused && (
          <Delete
            style={{ marginLeft: '0.625rem' }}
            onClick={onDelete}
            onMouseDown={onDelete}
            onTouchStart={onDelete}
          ></Delete>
        )}
      </TextAreaWrapper>
      {error && <ErrorText>{errorMsg}</ErrorText>}
    </TextAreaContainer>
  )
}

export default TextArea
