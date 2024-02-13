import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header/Header'
import { AddInfoContainer, TextFieldWrapper } from './styles'
import TextArea from '../../../components/TextField/TextArea/TextArea'
import { useRecoilState, useRecoilValue } from 'recoil'
import SourceInput from './components/sourceInput/SourceInput'
import HashtagInput, { hashTagState } from './components/HashTags/HashTag'
import { itemInfoState } from '../../../recoil/itemInfo'
import { useNavigate } from 'react-router-dom'

const AddInfo = () => {
  const navigate = useNavigate()

  const [itemInfo, setItemInfo] = useRecoilState(itemInfoState)

  const [addInfoText, setAddInfoText] = useState<string | null>(itemInfo.additionalInfo ?? '')
  const [source, setSource] = useState<string | null>(itemInfo.infoSource)
  const hashTags = useRecoilValue(hashTagState)

  const [infoValid, setInfoValid] = useState(true)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const onSubmit = () => {
    setHasSubmitted(true)

    // setItemInfo({
    //   ...itemInfo,
    //   additionalInfo: addInfoText === '' ? null : addInfoText,
    //   infoSource: source === '' ? null : source,
    //   hashTagList: hashTags.length === 0 ? null : hashTags,
    // })
    // setInfoValid(true)
    // navigate(-1)

    if (addInfoText || source || hashTags.length > 0) {
      console.log(addInfoText)
      console.log('hashTags', hashTags)
      setItemInfo({
        ...itemInfo,
        additionalInfo: addInfoText === '' ? null : addInfoText,
        infoSource: source === '' ? null : source,
        hashTagList: hashTags.length === 0 ? null : hashTags,
      })
      setInfoValid(true)
      navigate(-1)
    } else {
      setInfoValid(false)
    }
  }

  useEffect(() => {
    if (hasSubmitted) {
      if (addInfoText || source || hashTags) {
        setInfoValid(true)
      } else {
        setInfoValid(false)
      }
    }
  }, [addInfoText, source])

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
      <HashtagInput placeholder='애착템 #최애템 #추천템' />
      <SourceInput source={source} setSource={setSource} />
    </AddInfoContainer>
  )
}

export default AddInfo
