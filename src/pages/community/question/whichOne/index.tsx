import React, { useEffect, useState } from 'react'
import TwoItemUpload from '../components/twoItemUpload'
import { SubComponentContainer } from '../howAboutThis/styles'
import { ComponentWrapper, Label, LabelContainer } from '../../../item/create/styles'
import DefaultTextfield from '../../../../components/TextField/DefaultTextfield/DefaultTextfield'
import { useRecoilState } from 'recoil'
import { communityItemState } from '../../../../recoil/communityInfo'
import { ErrorText } from '../../../../components/TextField/DefaultTextfield/styles'
import { ReactComponent as Error } from '../../../../assets/error_20.svg'
import SetVoteDateTime from '../components/setVoteTime'
import { convertToUTC } from '../../../../utils/utility'
import useModals from '../../../../components/Modals/hooks/useModals'
import { modals } from '../../../../components/Modals'
import VoteDisplayField from '../components/VoteDisplayField'

interface WhichOneProps {
  hasTriedToUpload: boolean
}

const WhichOne = ({ hasTriedToUpload }: WhichOneProps) => {
  const { openModal } = useModals()
  const [questionInfo, setQuestionInfo] = useRecoilState(communityItemState)
  const [title, setTitle] = useState<string | null>(questionInfo.title)
  const today = new Date()
  const defaultEndDateTime = new Date(new Date().setDate(today.getDate() + 1))

  useEffect(() => {
    setQuestionInfo({
      ...questionInfo,
      title: title,
    })
    console.log(questionInfo)
  }, [title])

  useEffect(() => {
    setQuestionInfo({
      ...questionInfo,
      voteEndTime: defaultEndDateTime,
    })
  }, [])
  return (
    <SubComponentContainer>
      <ComponentWrapper>
        <LabelContainer>
          {hasTriedToUpload && (!title || (title && title.length < 10)) && <Error></Error>}
          <Label>아이템 정보를 물어보세요</Label>
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
          <TwoItemUpload></TwoItemUpload>
        </div>
      </ComponentWrapper>
      {/* <ComponentWrapper className='padding'></ComponentWrapper> */}
      <ComponentWrapper>
        <LabelContainer>
          {hasTriedToUpload && (!title || (title && title.length < 10)) && <Error></Error>}
          <Label>투표 마감시간을 정해주세요</Label>
        </LabelContainer>
        <div className='padding' onClick={() => openModal(modals.QuestionDateTimePickerModal)}>
          <VoteDisplayField dateTime={questionInfo?.voteEndTime}></VoteDisplayField>
        </div>
      </ComponentWrapper>
    </SubComponentContainer>
  )
}

export default WhichOne
