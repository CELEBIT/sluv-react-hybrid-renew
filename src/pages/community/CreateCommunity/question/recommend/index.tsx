import React, { useEffect, useState } from 'react'
import { ComponentWrapper, Label, LabelContainer } from '../../../../item/create/styles'
import DefaultTextfield from '../../../../../components/TextField/DefaultTextfield/DefaultTextfield'
import { ErrorText } from '../../../../../components/TextField/DefaultTextfield/styles'
import TextArea from '../../../../../components/TextField/TextArea/TextArea'
import AddPhotos from '../../../../../components/AddPhotos/AddPhotos'
import { ReactComponent as Error } from '../../../../../assets/error_20.svg'
import { useRecoilState, useRecoilValue } from 'recoil'
import { communityItemState, hasTriedUpload } from '../../../../../recoil/communityInfo'
import { SubComponentContainer } from '../howAboutThis/styles'
import { useNavigate } from 'react-router-dom'
import AddItemPhotos from '../../../../../components/AddPhotos/AddItemPhotos'
import SelectRecommendCategory from '../components/selectRecommendCategory'

const Recommend = () => {
  const navigate = useNavigate()
  const hasTriedToUpload = useRecoilValue<boolean>(hasTriedUpload)

  const [questionInfo, setQuestionInfo] = useRecoilState(communityItemState)
  const [title, setTitle] = useState<string | null>(questionInfo.title)
  const [content, setContent] = useState<string | undefined | null>(questionInfo.content)

  useEffect(() => {
    setQuestionInfo({
      ...questionInfo,
      title: title,
      content: content,
    })
    console.log(questionInfo)
  }, [title, content])

  return (
    <SubComponentContainer>
      <ComponentWrapper className='top'>
        <LabelContainer>
          <Label>주제를 골라주세요</Label>
        </LabelContainer>
        <SelectRecommendCategory></SelectRecommendCategory>
      </ComponentWrapper>
      <ComponentWrapper>
        <LabelContainer>
          {hasTriedToUpload && (!title || (title && title.length < 10)) && <Error></Error>}
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
        {hasTriedToUpload && title && title.length < 10 && (
          <ErrorText className='error'>제목을 10자 이상 입력해 주세요</ErrorText>
        )}
        {hasTriedToUpload && title && title.length > 60 && (
          <ErrorText className='error'>제목은 최대 60자까지 입력할 수 있어요</ErrorText>
        )}
        <div className='padding'>
          <TextArea
            value={content ?? ''}
            setValue={setContent}
            placeholder='예) 매일 착용하는 애착템 추천해 줘
예) 선물용으로 가성비 좋은 아이템 추천해 줘
예) 재미있는 프로그램 추천해 줘'
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
export default Recommend
