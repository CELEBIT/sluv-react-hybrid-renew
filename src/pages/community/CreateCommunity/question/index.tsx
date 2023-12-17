import React, { useEffect, useState } from 'react'
import { QuestionContainer } from '../styles'
import CommunityHeader, {
  communityMenuState,
} from '../../../../components/Header/CommunityHeader/CommunityHeader'
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
  imgItemListState,
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
  const CommunityMenu = useRecoilValue(communityMenuState)
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
      if (CommunityMenu === '이 중에 뭐 살까') {
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
          MutateByBuyRequest({
            ...questionItem,
            imgList: finalImgList as IimgList[],
            itemList: finalItemList as IitemList[],
          })
          resetQuestionItem()
        }
      } else if (CommunityMenu === '이거 어때') {
        console.log(questionItem)
        MutateByHowAboutRequest(questionItem)
        resetQuestionItem()
      } else {
        console.log(CommunityMenu)
        if (questionItem.categoryNameList?.length ?? 0 > 0) {
          MutateByRecommendRequest(questionItem)
          resetQuestionItem()
        }
      }
    }
  }
  // const [imgItemList, setImageItemList] = useRecoilState(imgItemListState)
  // const onSubmit = async () => {
  //   const updatedImgItemList = imgItemList.map((item, index) => ({
  //     ...item,
  //     sortOrder: index,
  //   }))
  //   setImageItemList(updatedImgItemList)
  //   const imgList = updatedImgItemList
  //     .filter((item) => item.imgFile)
  //     .map(({ imgFile, description, sortOrder }) => ({
  //       imgFile: imgFile,
  //       description: description,
  //       representFlag: sortOrder === 0,
  //       sortOrder: sortOrder,
  //     }))

  //   const itemList = updatedImgItemList
  //     .filter((item) => item.itemId !== undefined)
  //     .map(({ itemId, description, sortOrder }) => ({
  //       itemId: itemId,
  //       description: description,
  //       representFlag: sortOrder === 0,
  //       sortOrder: sortOrder,
  //     }))
  // }

  // 1. imgItemList 에 있는 순서대로 sortOrder를 각각 추가,
  // 2. img, item으로 분리
  // 3. img를 presignedUrl 받아서 IimgList의 형식으로 넣기.
  // 4. 커뮤니티 아이템으로 업데이트

  //   export interface CommunityItem {
  //   id: number | null
  //   celebId?: number | null
  //   newCelebId?: number | null
  //   title: string | null
  //   content?: string | null
  //   imgList: Array<IimgList> | null
  //   itemList: Array<IitemList> | null
  //   categoryNameList?: Array<string> | null
  //   voteEndTime?: Date | undefined
  // }

  // export interface IimgList {
  //   imgUrl: string
  //   description: string | null
  //   representFlag: boolean | null
  //   sortOrder: number
  // }

  // export interface IitemList {
  //   itemId: number
  //   description: string | null
  //   representFlag: boolean | null
  //   sortOrder: number
  // }
  useEffect(() => {
    setHasTriedToUpload(false)
  }, [CommunityMenu])

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
