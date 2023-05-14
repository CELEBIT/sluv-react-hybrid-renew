import React, { useState, useRef, useEffect } from 'react'
import { SearchedHashTag, Tag, TagInput, TagInputContainer } from './styles'
import debounce from 'lodash/debounce'
import { atom, useRecoilState } from 'recoil'
import { atomKeys } from '../../../../../config/atomKeys'
import { HashTagWrapper } from '../../styles'
import HighlightedText from '../../../../../components/HighlightedText/HighlightedText'

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
  const searchResult = [
    {
      hashtagId: 1,
      hashtagContent: '애착템',
      count: 4,
    },
    {
      hashtagId: 2,
      hashtagContent: '애착템으로',
      count: 144,
    },
    {
      hashtagId: 3,
      hashtagContent: '애착템할래',
      count: 6,
    },
  ]
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
    debouncedSearch(event.target.value)
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

  const debouncedSearch = useRef(
    debounce((hashtag: string) => {
      console.log('Calling search API with hashtag:', hashtag)
      // replace with actual search API call
    }, 300),
  ).current
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
        <div className='searchedTags'>
          {searchResult.map((hashtag) => {
            return (
              <SearchedHashTag
                key={hashtag.hashtagId}
                onClick={() => onClickSearchedHashtag(hashtag.hashtagContent)}
              >
                <span>#</span>
                <HighlightedText searchText={currentTag} text={hashtag.hashtagContent} />
                <span>{hashtag.count}</span>
              </SearchedHashTag>
            )
          })}
        </div>
      )}
    </HashTagWrapper>
  )
}

export default HashtagInput
