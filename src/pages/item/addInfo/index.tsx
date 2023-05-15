import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header/Header'
import { AddInfoContainer, HashTagWrapper, TextFieldWrapper } from './styles'
import TextArea from '../../../components/TextField/TextArea/TextArea'
import { useRecoilState, useSetRecoilState } from 'recoil'
import SourceInput from './components/sourceInput/SourceInput'
import HashtagInput, { hashTagState } from './components/HashTags/HashTag'
import { itemInfoState } from '../../../recoil/itemInfo'
import { useNavigate } from 'react-router-dom'

const AddInfo = () => {
  const navigate = useNavigate()

  const [itemInfo, setItemInfo] = useRecoilState(itemInfoState)
  const [addInfoText, setAddInfoText] = useState<string | null>(itemInfo.additionalInfo)
  const setHashTags = useSetRecoilState(hashTagState)
  const [infoValid, setInfoValid] = useState(true)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  console.log('hasSubmitted', hasSubmitted)

  const onSubmit = () => {
    setHasSubmitted(true)
    if (addInfoText) {
      setItemInfo({
        ...itemInfo,
        additionalInfo: addInfoText,
      })
      setInfoValid(true)
      navigate('/item/create')
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
      <Header isModalHeader={false} hasArrow={true} title={'추가 정보'}>
        <span className='submit' onClick={onSubmit}>
          완료
        </span>
      </Header>
      <TextFieldWrapper>
        <TextArea
          value={addInfoText ?? ''}
          setValue={setAddInfoText}
          placeholder='자유롭게 의견을 적어보세요
300자 이내'
          error={hasSubmitted ? !infoValid : false}
          errorMsg='추가 정보를 입력해주세요'
        ></TextArea>
      </TextFieldWrapper>
      <HashTagWrapper>
        <HashtagInput placeholder='애착템 #최애템 #추천템' onChange={setHashTags} />
      </HashTagWrapper>
      <SourceInput></SourceInput>
    </AddInfoContainer>
  )
}

export default AddInfo
