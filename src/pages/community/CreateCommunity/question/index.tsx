import React, { useEffect, useState } from 'react'
import { QuestionContainer } from '../styles'
import CommunityHeader from '../../../../components/Header/CommunityHeader/CommunityHeader'
import { ComponentContainer } from '../../../item/create/styles'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { HeaderWrapper } from '../../../item/addInfo/styles'
import {
  IimgList,
  IitemList,
  communityItemState,
  communityQuestionMenuState,
  firstItemState,
  hasTriedUpload,
  secondItemState,
} from '../../../../recoil/communityInfo'
import HowAboutThis from './howAboutThis'
import Recommend from './recommend'
import WhichOne from './whichOne'
import useUploadQuestionQuery from '../../../../apis/question/hooks/useUploadQuestionQuery'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const Question = () => {
  const navigate = useNavigate()
  const [questionItem, setQuestionItem] = useRecoilState(communityItemState)
  const resetQuestionItem = useResetRecoilState(communityItemState)
  const [hasTriedToUpload, setHasTriedToUpload] = useRecoilState<boolean>(hasTriedUpload)
  const [communityQuestionMenu, setCommunityQuestionMenu] = useRecoilState(
    communityQuestionMenuState,
  )

  const firstItem = useRecoilValue(firstItemState)
  const secondItem = useRecoilValue(secondItemState)

  const {
    postBuyRequest: { mutate: MutateByBuyRequest },
    postHowAboutRequest: { mutate: MutateByHowAboutRequest },
    postRecommendRequest: { mutate: MutateByRecommendRequest },
  } = useUploadQuestionQuery()

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
          const {
            postBuyRequest: { mutate },
          } = useUploadQuestionQuery()
          MutateByBuyRequest({
            ...questionItem,
            imgList: finalImgList as IimgList[],
            itemList: finalItemList as IitemList[],
          })
          resetQuestionItem()
        }
      } else if (communityQuestionMenu === '이거 어때') {
        console.log(questionItem)
        MutateByHowAboutRequest(questionItem)
        resetQuestionItem()
      } else {
        console.log(questionItem)
        if (questionItem.categoryNameList?.length ?? 0 > 0) {
          MutateByRecommendRequest(questionItem)
          resetQuestionItem()
        }
      }
    }
  }
  useEffect(() => {
    setHasTriedToUpload(false)
  }, [communityQuestionMenu])

  return (
    <QuestionContainer>
      <HeaderWrapper>
        <CommunityHeader backBtnClick={() => navigate('/community')}>
          <span className='submit' onClick={onSubmit}>
            완료
          </span>
        </CommunityHeader>
      </HeaderWrapper>
      <ComponentContainer className='top'>
        <Outlet></Outlet>
      </ComponentContainer>
    </QuestionContainer>
  )
}

export default Question