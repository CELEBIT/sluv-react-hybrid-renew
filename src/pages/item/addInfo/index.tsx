import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header/Header'
import { AddInfoContainer, HashTagWrapper, HeaderWrapper, TextFieldWrapper } from './styles'
import TextArea from '../../../components/TextField/TextArea/TextArea'
import { useRecoilState } from 'recoil'
import SourceInput from './components/sourceInput/SourceInput'
import { addInfoTextState } from './Atoms/atoms'
import HashtagInput from './components/HashTags/HashTag'

const AddInfo = () => {
  const [addInfoText, setAddInfoText] = useRecoilState(addInfoTextState)
  //   const infoSource = useRecoilValue(infoSourceState)
  const [infoValid, setInfoValid] = useState(true)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const onSubmit = () => {
    setHasSubmitted(true)
    if (addInfoText) {
      setInfoValid(true)
    } else {
      setInfoValid(false)
    }
  }
  useEffect(() => {
    if (hasSubmitted) {
      if (addInfoText) {
        setInfoValid(true)
      } else {
        setInfoValid(false)
      }
    }
  }, [addInfoText])
  return (
    <AddInfoContainer>
      <HeaderWrapper>
        <Header isModalHeader={false} hasArrow={true} title={'추가 정보'}>
          <span className='submit' onClick={onSubmit}>
            완료
          </span>
        </Header>
      </HeaderWrapper>
      <TextFieldWrapper>
        <TextArea
          value={addInfoText}
          setValue={setAddInfoText}
          placeholder='자유롭게 의견을 적어보세요
300자 이내'
          error={hasSubmitted ? !infoValid : false}
          errorMsg='추가 정보를 입력해주세요'
        ></TextArea>
      </TextFieldWrapper>
      <HashTagWrapper>
        <div className='hashtag'>
          <span>#hashtag</span>
        </div>
        <div className='hashtag'>#hastag</div>
      </HashTagWrapper>
      <SourceInput></SourceInput>
      <br />
      <HashtagInput></HashtagInput>
    </AddInfoContainer>
  )
}

export default AddInfo
