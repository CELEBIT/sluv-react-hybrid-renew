import React, { useCallback, useEffect, useMemo, useState } from 'react'
import TwoItemUpload from '../components/twoItemUpload'
import { SubComponentContainer } from '../howAboutThis/styles'
import { ComponentWrapper, Label, LabelContainer } from '../../../../item/create/styles'
import DefaultTextfield from '../../../../../components/TextField/DefaultTextfield/DefaultTextfield'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import {
  communityItemState,
  firstItemState,
  hasTriedUpload,
  secondItemState,
} from '../../../../../recoil/communityInfo'
import { ErrorText } from '../../../../../components/TextField/DefaultTextfield/styles'
import { ReactComponent as Error } from '../../../../../assets/error_20.svg'
import useModals from '../../../../../components/Modals/hooks/useModals'
import { modals } from '../../../../../components/Modals'
import VoteDisplayField from '../components/VoteDisplayField'
import { useNavigate } from 'react-router-dom'

const WhichOne = () => {
  // console.log('whichone render')
  const { openModal } = useModals()
  const hasTriedToUpload = useRecoilValue<boolean>(hasTriedUpload)

  const navigate = useNavigate()
  const [questionInfo, setQuestionInfo] = useRecoilState(communityItemState)
  const today = new Date()
  const defaultEndDateTime = new Date(new Date().setDate(today.getDate() + 1))
  const [firstItem, setFirstItem] = useRecoilState(firstItemState)
  const [secondItem, setSecondItem] = useRecoilState(secondItemState)

  const handleTitleChange = useCallback(
    (value: string) => {
      const updatedQuestionInfo = { ...questionInfo, title: value }
      // Only update state if the title has actually changed
      if (questionInfo.title !== value) {
        setQuestionInfo(updatedQuestionInfo)
      }
    },
    [questionInfo, setQuestionInfo],
  )

  // TwoItemUpload의 onClick 함수를 useCallback으로 메모이제이션
  const handleTwoItemUploadClick = useCallback(() => {
    navigate('/community/select-item-photo')
  }, [navigate])

  // VoteDisplayField의 dateTime prop을 useMemo로 메모이제이션
  const memoizedVoteEndTime = useMemo(() => questionInfo?.voteEndTime, [questionInfo?.voteEndTime])

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
          {hasTriedToUpload &&
            (!questionInfo.title || (questionInfo.title && questionInfo.title.length < 10)) && (
              <Error></Error>
            )}
          <Label>고민되는 아이템을 물어보세요</Label>
        </LabelContainer>
        <div className='padding'>
          <DefaultTextfield
            value={questionInfo.title ?? ''}
            setValue={handleTitleChange}
            placeholder='제목'
          />
        </div>
        {hasTriedToUpload && !questionInfo.title && (
          <ErrorText className='error'>필수 항목입니다</ErrorText>
        )}
        {hasTriedToUpload && questionInfo.title && questionInfo.title.length < 10 && (
          <ErrorText className='error'>제목을 10자 이상 입력해 주세요</ErrorText>
        )}
        {hasTriedToUpload && questionInfo.title && questionInfo.title.length > 60 && (
          <ErrorText className='error'>제목은 최대 60자까지 입력할 수 있어요</ErrorText>
        )}
        <div className='padding'>
          <TwoItemUpload onClick={handleTwoItemUploadClick}></TwoItemUpload>
        </div>
        {hasTriedToUpload &&
          (!firstItem.description || (!firstItem.imgUrl && !firstItem.imgFile)) &&
          (!secondItem.description || (!secondItem.imgUrl && !secondItem.imgFile)) && (
            <ErrorText className='error'>필수 항목입니다</ErrorText>
          )}
      </ComponentWrapper>
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
          <VoteDisplayField dateTime={memoizedVoteEndTime}></VoteDisplayField>
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

export default React.memo(WhichOne)
