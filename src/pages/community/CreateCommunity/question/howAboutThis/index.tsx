import React, { useEffect, useState } from 'react'
import { ComponentWrapper, Label, LabelContainer } from '../../../../item/create/styles'
import DefaultTextfield from '../../../../../components/TextField/DefaultTextfield/DefaultTextfield'
import { ErrorText } from '../../../../../components/TextField/DefaultTextfield/styles'
import TextArea from '../../../../../components/TextField/TextArea/TextArea'
import AddItemPhotos from '../../../../../components/AddPhotos/AddItemPhotos'
import { ReactComponent as Error } from '../../../../../assets/error_20.svg'
import { useRecoilState, useRecoilValue } from 'recoil'
import { communityItemState, hasTriedUpload } from '../../../../../recoil/communityInfo'
import { SubComponentContainer } from './styles'
import { useNavigate } from 'react-router-dom'

const HowAboutThis = () => {
  const navigate = useNavigate()
  const hasTriedToUpload = useRecoilValue<boolean>(hasTriedUpload)

  const [questionInfo, setQuestionInfo] = useRecoilState(communityItemState)
  const [title, setTitle] = useState<string | null>(questionInfo.title)
  const [content, setContent] = useState<string | null | undefined>(questionInfo.content)

  useEffect(() => {
    setQuestionInfo({
      ...questionInfo,
      title: title,
      content: content,
    })
    // console.log(questionInfo)
  }, [title, content])

  return (
    <SubComponentContainer>
      <ComponentWrapper className='top'>
        <LabelContainer>
          {hasTriedToUpload && (!title || (title && title.length <= 10)) && <Error></Error>}
          <Label>자유롭게 물어보세요</Label>
        </LabelContainer>
        <div className='padding'>
          <DefaultTextfield
            value={title ?? ''}
            setValue={setTitle}
            placeholder='제목'
          ></DefaultTextfield>
        </div>
        {hasTriedToUpload && !title && <ErrorText className='error'>필수 항목입니다</ErrorText>}
        {hasTriedToUpload && title && title.length <= 10 && (
          <ErrorText className='error'>제목을 10자 이상 입력해 주세요</ErrorText>
        )}
        {hasTriedToUpload && title && title.length > 60 && (
          <ErrorText className='error'>제목은 최대 60자까지 입력할 수 있어요</ErrorText>
        )}
        <div className='padding'>
          <TextArea
            value={content ?? ''}
            setValue={setContent}
            placeholder='예) 이거 살까 말까 고민인데, 어때?
예) 이 프로그램 재밌어? 어때?
예) 이거 먹어본 적 있어? 어때?'
          ></TextArea>
        </div>
      </ComponentWrapper>
      <ComponentWrapper className='noGap'>
        <LabelContainer>
          <Label>
            아이템/사진을 올려주세요 <span className='optional'>(선택)</span>
          </Label>
        </LabelContainer>
        <AddItemPhotos onClick={() => navigate('/community/select-item-photo')}></AddItemPhotos>
      </ComponentWrapper>
    </SubComponentContainer>
  )
}

export default HowAboutThis
