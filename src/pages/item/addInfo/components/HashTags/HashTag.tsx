import React, { useEffect, useRef, useState } from 'react'
import { HashTagInput } from './styles'
import debounce from 'lodash/debounce'
import { parseHashTags } from './Hashtag.util'
import { useRecoilValue } from 'recoil'
import { hashTagState } from '../../Atoms/atoms'

interface HashtagInputProps {
  placeholder: string
  onChange: (hashtags: string[]) => void
}

const HashtagInput: React.FC<HashtagInputProps> = ({ placeholder, onChange }) => {
  const hashTag = useRecoilValue(hashTagState)
  const [value, setValue] = useState<string>(hashTag.map((tag) => `#${tag}`).join(' '))
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value
    const hashtags = parseHashTags(inputValue)
    setValue(inputValue)
    onChange(hashtags)

    const cursorPosition = event.currentTarget?.selectionStart ?? 0
    const inputText = event.currentTarget?.value ?? ''
    const match = inputText.substring(0, cursorPosition).match(/(^|\s)#(\p{L}+)$/u)

    if (match) {
      const hashtag = match[0].substring(1)
      debouncedSearch(hashtag)
    }
  }

  const debouncedSearch = useRef(
    debounce((hashtag: string) => {
      console.log('Calling search API with hashtag:', hashtag)
      // replace with actual search API call
    }, 300),
  ).current

  useEffect(() => {
    // textarea scroll height 설정
    if (textareaRef.current) {
      textareaRef.current.style.height = '0px'
      const scrollHeight = textareaRef.current.scrollHeight
      textareaRef.current.style.height = scrollHeight + 'px'
    }
  }, [value])

  return (
    <HashTagInput
      placeholder={placeholder}
      value={value}
      onChange={handleInputChange}
      ref={textareaRef}
    />
  )
}

export default HashtagInput
