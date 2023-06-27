import React, { useState, useMemo } from 'react'
import { InputField, InputWrapper } from './styles'
import { ReactComponent as Delete } from '../../../assets/delete_textfield_24.svg'
import { ReactComponent as Search } from '../../../assets/search_24.svg'

interface SearchTextFieldProps {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  onEnter: () => void
  placeholder: string
}

const SearchTextfield = ({ value, setValue, onEnter, placeholder }: SearchTextFieldProps) => {
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
  // const searchRef = useRef<HTMLInputElement>(null)
  // useEffect(() => {
  //   searchRef?.current?.focus()
  // }, [searchRef])
  return (
    <InputWrapper onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}>
      <Search style={{ marginRight: '0.5rem' }} fill='#7B8894'></Search>
      <InputField
        value={value}
        placeholder={placeholder}
        // ref={searchRef}
        autoFocus={false}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      ></InputField>
      {value.length !== 0 && isFocused && (
        <Delete
          style={{ marginLeft: '0.625rem' }}
          onClick={onDelete}
          onMouseDown={onDelete}
        ></Delete>
      )}
    </InputWrapper>
  )
}

export default SearchTextfield
