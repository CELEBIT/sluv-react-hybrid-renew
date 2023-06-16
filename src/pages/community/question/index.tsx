import React, { useEffect, useState } from 'react'
import { QuestionContainer } from './styles'
import CommunityHeader from '../../../components/Header/CommunityHeader/CommunityHeader'
import {
  ComponentContainer,
  LabelContainer,
  ComponentWrapper,
  Label,
} from '../../item/create/styles'
import { useRecoilState, useRecoilValue } from 'recoil'
import { HeaderWrapper } from '../../item/addInfo/styles'
import {
  IimgList,
  IitemList,
  communityItemState,
  communityQuestionMenuState,
  firstItemState,
  secondItemState,
} from '../../../recoil/communityInfo'
import SelectQuestionMenu from './components/selectQuestionMenu'
import HowAboutThis from './howAboutThis'
import Recommend from './recommend'
import SelectRecommendCategory from './components/selectRecommendCategory'
import WhichOne from './whichOne'

const Question = () => {
  const [questionItem, setQuestionItem] = useRecoilState(communityItemState)
  const [hasTriedToUpload, setHasTriedToUpload] = useState<boolean>(false)
  const communityQuestionMenu = useRecoilValue(communityQuestionMenuState)
  const firstItem = useRecoilValue(firstItemState)
  const secondItem = useRecoilValue(secondItemState)

  const updateDescription = (
    list: Array<IimgList | IitemList> | null,
    imgUrl: string | undefined,
    itemId: number | null | undefined,
    description: string | undefined,
  ): Array<IimgList | IitemList> | null => {
    if (list && imgUrl && description) {
      return list.map((item) => {
        if ('imgUrl' in item) {
          if ((item as IimgList).imgUrl === imgUrl) {
            return { ...(item as IimgList), description: description }
          }
        } else {
          if (itemId !== undefined && (item as IitemList).itemId === itemId) {
            return { ...(item as IitemList), description: description }
          }
        }
        return item
      })
    }
    return list
  }

  const onSubmit = () => {
    setHasTriedToUpload(true)
    console.log(questionItem)
    if (questionItem.title && questionItem.title.length > 10 && questionItem.title.length < 60) {
      if (communityQuestionMenu === '이 중에 뭐 살까') {
        if (
          firstItem.imgUrl &&
          secondItem.imgUrl &&
          firstItem.description &&
          secondItem.description &&
          questionItem.voteEndTime
        ) {
          // firstItem 이 imgList, itemList 둘중에 하나에 있으면 firstItem.description을 imgList또는 itemList에 들어있는 object의 description에 저장
          const updatedImgList = updateDescription(
            questionItem.imgList,
            firstItem.imgUrl,
            firstItem?.itemId,
            firstItem.description,
          )
          const updatedItemList = updateDescription(
            questionItem.itemList,
            firstItem.imgUrl,
            firstItem?.itemId,
            firstItem.description,
          )
          // secondItem, 이 imgList, itemList 둘중에 하나에 있으면 firstItem.description을 imgList또는 itemList에 들어있는 object의 description에 저장
          const finalImgList = updateDescription(
            updatedImgList,
            secondItem.imgUrl,
            secondItem?.itemId,
            secondItem.description,
          )
          const finalItemList = updateDescription(
            updatedItemList,
            secondItem.imgUrl,
            secondItem?.itemId,
            secondItem.description,
          )
          // 최종 업데이트
          setQuestionItem({
            ...questionItem,
            imgList: finalImgList as IimgList[],
            itemList: finalItemList as IitemList[],
          })
          alert('success')
        }
      } else if (communityQuestionMenu === '이거 어때') {
        alert('success')
      } else {
        alert('success')
      }
    }
  }
  useEffect(() => {
    setHasTriedToUpload(false)
  }, [communityQuestionMenu])

  useEffect(() => {
    console.log('questionItem 수정시', questionItem)
  }, [questionItem])

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
          {communityQuestionMenu === '추천해 줘' && (
            <SelectRecommendCategory></SelectRecommendCategory>
          )}
        </ComponentWrapper>
        {/* 아이템 정보를 물어보세요 */}
        {communityQuestionMenu === '이 중에 뭐 살까' ? (
          <WhichOne hasTriedToUpload={hasTriedToUpload}></WhichOne>
        ) : (
          <>
            {communityQuestionMenu === '이거 어때' ? (
              <HowAboutThis hasTriedToUpload={hasTriedToUpload}></HowAboutThis>
            ) : (
              <Recommend hasTriedToUpload={hasTriedToUpload}></Recommend>
            )}
          </>
        )}
      </ComponentContainer>
    </QuestionContainer>
  )
}

export default Question
