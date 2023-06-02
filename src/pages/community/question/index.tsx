import React, { useState } from 'react'
import { QuestionContainer } from './styles'
import CommunityHeader from '../../../components/Header/CommunityHeader/CommunityHeader'
import {
  ComponentContainer,
  LabelContainer,
  ComponentWrapper,
  Label,
} from '../../item/create/styles'
import { selectedCelebState } from '../../../components/SelectCeleb/SelectCeleb'

import { useRecoilState, useRecoilValue } from 'recoil'
import { HeaderWrapper } from '../../item/addInfo/styles'
import { communityItemState, communityQuestionMenuState } from '../../../recoil/communityInfo'
import SelectQuestionMenu from './components/selectQuestionMenu'
import HowAboutThis from './howAboutThis'

const Question = () => {
  const celeb = useRecoilValue(selectedCelebState)
  const [questionItem, setQuestionItem] = useRecoilState(communityItemState)
  const [hasTriedToUpload, setHasTriedToUpload] = useState<boolean>(false)
  const communityQuestionMenu = useRecoilValue(communityQuestionMenuState)
  const onSubmit = () => {
    setHasTriedToUpload(true)
    console.log(questionItem)
    if (
      celeb.id &&
      questionItem.title &&
      questionItem.title.length > 10 &&
      questionItem.title.length < 60
    ) {
      alert('success')
    }
  }

  return (
    <QuestionContainer>
      <HeaderWrapper>
        <CommunityHeader>
          <span className='submit' onClick={onSubmit}>
            완료
          </span>
        </CommunityHeader>
      </HeaderWrapper>
      <ComponentContainer>
        {/* 누가 착용했나요 */}
        <ComponentWrapper className='top'>
          <LabelContainer>
            <Label>주제를 골라주세요</Label>
          </LabelContainer>
          <SelectQuestionMenu></SelectQuestionMenu>
        </ComponentWrapper>
        {/* 아이템 정보를 물어보세요 */}
        {communityQuestionMenu === '이중에 뭐 살까' ? (
          <></>
        ) : (
          <>
            {communityQuestionMenu === '이거 어때' ? (
              <HowAboutThis hasTriedToUpload={hasTriedToUpload}></HowAboutThis>
            ) : (
              <></>
            )}
          </>
        )}
      </ComponentContainer>
    </QuestionContainer>
  )
}

export default Question
