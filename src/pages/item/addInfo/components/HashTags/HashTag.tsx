import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { hashTagState } from '../../Atoms/atoms'

const HashtagInput = () => {
  const [inputValue, setInputValue] = useState('')
  const [hashtags, setHashtags] = useRecoilState(hashTagState)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValue(value)
  }

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ' ' && inputValue.startsWith('#')) {
      event.preventDefault()
      const newHashtags = inputValue
        .split(' ')
        .filter((hashtag) => hashtag !== '' && hashtag !== '#')
      if (newHashtags.length > 0) {
        setHashtags([...hashtags, ...newHashtags])
        setInputValue(inputValue + ' ')
      }
      console.log(hashtags)
    }
  }

  return (
    <div>
      <input
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder='Type # to add hashtag'
      />
    </div>
  )
}

export default HashtagInput
