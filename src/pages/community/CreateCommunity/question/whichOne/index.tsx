import React, { useEffect, useState } from 'react'
import TwoItemUpload from '../components/twoItemUpload'
import { SubComponentContainer } from '../howAboutThis/styles'
import { ComponentWrapper, Label, LabelContainer } from '../../../../item/create/styles'
import DefaultTextfield from '../../../../../components/TextField/DefaultTextfield/DefaultTextfield'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  communityItemState,
  firstItemState,
  hasTriedUpload,
  secondItemState,
} from '../../../../../recoil/communityInfo'
import { ErrorText } from '../../../../../components/TextField/DefaultTextfield/styles'
import { ReactComponent as Error } from '../../../../../assets/error_20.svg'
import SetVoteDateTime from '../components/setVoteTime'
import { convertToUTC } from '../../../../../utils/utility'
import useModals from '../../../../../components/Modals/hooks/useModals'
import { modals } from '../../../../../components/Modals'
import VoteDisplayField from '../components/VoteDisplayField'
import { useNavigate } from 'react-router-dom'

const WhichOne = () => {
  const { openModal } = useModals()
  const hasTriedToUpload = useRecoilValue<boolean>(hasTriedUpload)

  const navigate = useNavigate()
  const [questionInfo, setQuestionInfo] = useRecoilState(communityItemState)
  const [title, setTitle] = useState<string | null>(questionInfo.title)
  const today = new Date()
  const defaultEndDateTime = new Date(new Date().setDate(today.getDate() + 1))
  const [firstItem, setFirstItem] = useRecoilState(firstItemState)
  const [secondItem, setSecondItem] = useRecoilState(secondItemState)
  useEffect(() => {
    setQuestionInfo({
      ...questionInfo,
      title: title,
    })
  }, [title])

  useEffect(() => {
    // 초기 마감시간 설정
    setQuestionInfo({
      ...questionInfo,
      content: null,
      voteEndTime: defaultEndDateTime,
    })
  }, [])
  return (
    <SubComponentContainer>
      <ComponentWrapper className='top'>
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
          <TwoItemUpload onClick={() => navigate('/community/select-item-photo')}></TwoItemUpload>
        </div>
        {hasTriedToUpload &&
          (!firstItem.description || (!firstItem.imgUrl && !firstItem.imgFile)) &&
          (!secondItem.description || (!secondItem.imgUrl && !secondItem.imgFile)) && (
            <ErrorText className='error'>필수 항목입니다</ErrorText>
          )}
      </ComponentWrapper>
      {/* <ComponentWrapper className='padding'></ComponentWrapper> */}
      <ComponentWrapper>
        <LabelContainer>
          {hasTriedToUpload &&
            questionInfo.voteEndTime &&
            questionInfo.voteEndTime < new Date(new Date().setHours(today.getHours() + 3)) && (
              <Error></Error>
            )}
          <Label>투표 마감시간을 정해주세요</Label>
        </LabelContainer>
        <div className='padding' onClick={() => openModal(modals.QuestionDateTimePickerModal)}>
          <VoteDisplayField dateTime={questionInfo?.voteEndTime}></VoteDisplayField>
        </div>
        {hasTriedToUpload &&
          questionInfo.voteEndTime &&
          questionInfo.voteEndTime < new Date(new Date().setHours(today.getHours() + 3)) && (
            <ErrorText className='error'>
              마감시간은 지금으로부터 최소 3시간 이후, 최대 7일 이내로 설정할 수 있습니다.
            </ErrorText>
          )}
      </ComponentWrapper>
    </SubComponentContainer>
  )
}

export default WhichOne
const data = {
  id: null,
  title: '김종국 이창섭 옷 중에 뭐가 더 나아?',
  imgList: [
    {
      imgUrl:
        'https://elasticbeanstalk-ap-northeast-2-931662394917.s3.ap-northeast-2.amazonaws.com/asset/community/post/52b6e750-c4cd-4bec-8b8d-8dca10872f3a.jpeg',
      description: '김종국',
      representFlag: true,
      sortOrder: 0,
    },
    {
      imgUrl:
        'https://elasticbeanstalk-ap-northeast-2-931662394917.s3.ap-northeast-2.amazonaws.com/asset/community/post/c548aedb-6cc5-4346-a947-2afa42fc2a45.png',
      description: '이창섭',
      representFlag: false,
      sortOrder: 1,
    },
  ],
  itemList: null,
  content: null,
  voteEndTime: '2023-12-19T05:15:59.789Z',
}
