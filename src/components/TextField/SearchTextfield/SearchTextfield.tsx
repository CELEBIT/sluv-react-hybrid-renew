import React, { useState } from 'react'
import { InputField, InputWrapper } from './styles'
import { ReactComponent as Delete } from '../../../assets/delete_textfield_24.svg'
import { ReactComponent as Search } from '../../../assets/search_24.svg'

interface SearchTextFieldProps {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  placeholder: string
}

const SearchTextfield = ({ value, setValue, placeholder }: SearchTextFieldProps) => {
  const [isFocused, setIsFocused] = useState(false)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    console.log('value:', value)
  }
  const onDelete = () => {
    setValue('')
  }
  return (
    <InputWrapper onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}>
      <Search style={{ marginRight: '0.5rem' }}></Search>
      <InputField value={value} placeholder={placeholder} onChange={handleInputChange}></InputField>
      {value.length !== 0 && isFocused && (
        <Delete
          style={{ marginLeft: '0.625rem' }}
          onClick={onDelete}
          onMouseDown={onDelete}
          onTouchStart={onDelete}
        ></Delete>
      )}
    </InputWrapper>
  )
}

export default SearchTextfield
