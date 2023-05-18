import React, { useState, useRef, useEffect } from 'react'
import { Tag, TagInput, TagInputContainer } from './styles'
import { atom, useRecoilState, useRecoilValue } from 'recoil'
import { atomKeys } from '../../../../../config/atomKeys'
import { HashTagWrapper } from '../../styles'
import HashTagSearchList from './HashTagSearchList'
import { IHashTag, itemInfoState } from '../../../../../recoil/itemInfo'
import useItemHashtagQuery from '../../../../../apis/item/hooks/useItemHashtagQuery'

interface HashtagInputProps {
  placeholder: string
}

export const hashTagState = atom<IHashTag[]>({
  key: atomKeys.hashTagState,
  default: [],
})

const HashtagInput: React.FC<HashtagInputProps> = ({ placeholder }) => {
  const {
    postHashtag: { mutate: mutateByPostHashtag },
  } = useItemHashtagQuery()

  const itemInfo = useRecoilValue(itemInfoState)
  const [hashTags, setHashtags] = useRecoilState(hashTagState)
  const [currentTag, setCurrentTag] = useState<string>('')
  const [isFocused, setIsFocused] = useState<boolean>(false)

  const tagInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (itemInfo.hashTagList) {
      setHashtags([...itemInfo.hashTagList])
    }
  }, [])

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
    if (event.key === 'Enter' || event.code === 'Space') {
      if (event.nativeEvent.isComposing) return
      event.preventDefault()

      if (currentTag.trim() !== '') {
        mutateByPostHashtag({ hashtagContent: currentTag })
        setCurrentTag('')
      }
    }
  }

  const onClickSearchedHashtag = (tag: IHashTag) => {
    setHashtags((prevTags) => [...prevTags, tag])
    setCurrentTag('')
    if (tagInputRef.current) {
      tagInputRef.current.focus()
    }
  }

  return (
    <HashTagWrapper>
      <TagInputContainer>
        {hashTags.map((tag, index) => (
          <Tag key={index}>#{tag.hashtagContent}</Tag>
        ))}
        <Tag>
          #
          <TagInput
            type='text'
            value={currentTag}
            ref={tagInputRef}
            placeholder={!hashTags.length ? placeholder : ''}
            onChange={handleInputChange}
            onClick={() => setIsFocused(true)}
            onKeyDown={handleInputKeyDown}
          />
        </Tag>
      </TagInputContainer>
      {isFocused && <HashTagSearchList name={currentTag} onClickHashTag={onClickSearchedHashtag} />}
    </HashTagWrapper>
  )
}

export default HashtagInput
