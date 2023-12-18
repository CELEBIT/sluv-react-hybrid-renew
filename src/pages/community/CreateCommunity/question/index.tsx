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
import useCommunityImgUpload from '../../../../apis/s3/hooks/useCommunityImgUpload'

const Question = () => {
  const navigate = useNavigate()
  const [questionItem, setQuestionItem] = useRecoilState(communityItemState)
  const resetQuestionItem = useResetRecoilState(communityItemState)
  const [hasTriedToUpload, setHasTriedToUpload] = useRecoilState<boolean>(hasTriedUpload)
  const CommunityMenu = useRecoilValue(communityMenuState)
  const [communityQuestionMenu, setCommunityQuestionMenu] = useRecoilState(
    communityQuestionMenuState,
  )
  const [imgItemList, setImageItemList] = useRecoilState(imgItemListState)

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

  const {
    postCommunityImg: { mutate: mutateByImgUpload },
  } = useCommunityImgUpload()

  const uploadImg = async () => {
    const updatedImgItemList = imgItemList.map((item, index) => ({
      ...item,
      sortOrder: index,
      representFlag: CommunityMenu === '이 중에 뭐 살까' ? true : index === 0,
      description:
        CommunityMenu === '이 중에 뭐 살까'
          ? index === 0
            ? firstItem.description
            : index === 1
            ? secondItem.description
            : item.description
          : item.description,
    }))
    setImageItemList(updatedImgItemList)

    const newImgList = updatedImgItemList
      .filter((item) => item.imgFile)
      .map(({ imgFile, description, sortOrder }) => ({
        imgFile: imgFile,
        description: description,
        representFlag: sortOrder === 0,
        sortOrder: sortOrder,
      }))
    await mutateByImgUpload(newImgList)
  }

  const onSubmit = () => {
    setHasTriedToUpload(true)
    console.log(questionItem)

    if (questionItem.title && questionItem.title.length > 10 && questionItem.title.length < 60) {
      console.log(CommunityMenu)
      if (CommunityMenu === '이 중에 뭐 살까') {
        console.log('이 중에 뭐 살까')
        if (
          (firstItem.imgUrl || firstItem.imgFile) &&
          (secondItem.imgUrl || secondItem.imgFile) &&
          firstItem.description &&
          secondItem.description &&
          questionItem.voteEndTime
        ) {
          console.log('uploadImage')
          uploadImg()
        }
      } else if (CommunityMenu === '이거 어때') {
        console.log('CommunityMenu === 이거어때')

        console.log(questionItem)
        // MutateByHowAboutRequest(questionItem)
        // resetQuestionItem()
        uploadImg()
      } else {
        if (questionItem.categoryNameList?.length ?? 0 > 0) {
          console.log('CommunityMenu === 추천해줘')

          // MutateByRecommendRequest(questionItem)
          // resetQuestionItem()
          uploadImg()
        }
      }
    }
  }

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
