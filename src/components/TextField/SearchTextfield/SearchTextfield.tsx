import React, { useEffect, useState } from 'react'
import { InputField, InputWrapper } from './styles'
import { ReactComponent as Delete } from '../../../assets/delete_textfield_24.svg'
import { ReactComponent as Search } from '../../../assets/search_24.svg'

interface SearchTextFieldProps {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  ref?: React.RefObject<HTMLInputElement>
  onEnter: () => void
  placeholder: string
}

const SearchTextfield = ({ value, setValue, onEnter, placeholder, ref }: SearchTextFieldProps) => {
  const [isFocused, setIsFocused] = useState(false)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    console.log('value:', value)
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEnter()
    }
  }
  const onDelete = () => {
    setValue('')
  }
  useEffect(() => {
    if (ref && ref.current) {
      ref.current.focus()
    }
  }, [ref])
  return (
    <InputWrapper onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}>
      <Search style={{ marginRight: '0.5rem' }}></Search>
      <InputField
        ref={ref}
        autoFocus={true}
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
  )
}

export default SearchTextfield
