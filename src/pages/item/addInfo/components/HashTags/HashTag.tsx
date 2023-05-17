import React, { useState, useRef, useEffect } from 'react'
import { Tag, TagInput, TagInputContainer } from './styles'
import { atom, useRecoilState } from 'recoil'
import { atomKeys } from '../../../../../config/atomKeys'
import { HashTagWrapper } from '../../styles'
import HashTagSearchList from './HashTagSearchList'

interface HashtagInputProps {
  placeholder: string
  onChange: (hashtags: string[]) => void
}

export const hashTagState = atom<string[]>({
  key: atomKeys.hashTagState,
  default: [],
})

const HashtagInput: React.FC<HashtagInputProps> = ({ placeholder }) => {
  const [hashTags, setHashtags] = useRecoilState(hashTagState)

  const [currentTag, setCurrentTag] = useState<string>('')

  useEffect(() => {
    const handleBackspace = (event: KeyboardEvent) => {
      if (event.key === 'Backspace' && currentTag === '') {
        setHashtags((prevTags) => prevTags.slice(0, prevTags.length - 1))
      }
    }
    document.addEventListener('keydown', handleBackspace)
    console.log(hashTags)
    return () => {
      document.removeEventListener('keydown', handleBackspace)
    }
  }, [currentTag])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTag(event.target.value)
  }

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ' ') {
      event.preventDefault()
      if (currentTag.trim() !== '') {
        setHashtags((prevTags) => [...prevTags, currentTag.trim()])
        setCurrentTag('')
      }
    }
  }
  const tagInputRef = useRef<HTMLInputElement>(null)
  const onClickSearchedHashtag = (hashtagContent: string) => {
    setCurrentTag(hashtagContent)
    setHashtags((prevTags) => [...prevTags, hashtagContent.trim()])
    setCurrentTag('')
    if (tagInputRef.current) {
      tagInputRef.current.focus()
    }
  }

  return (
    <HashTagWrapper>
      <TagInputContainer>
        {hashTags.map((tag, index) => (
          <Tag key={index}>#{tag}</Tag>
        ))}
        <Tag>
          #
          <TagInput
            type='text'
            value={currentTag}
            ref={tagInputRef}
            placeholder={!hashTags.length ? placeholder : ''}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
          />
        </Tag>
      </TagInputContainer>
      {currentTag && (
        <HashTagSearchList name={currentTag} onClickHashTag={onClickSearchedHashtag} />
      )}
    </HashTagWrapper>
  )
}

export default HashtagInput
