import React, { useEffect, useState } from 'react'
import { QuestionContainer } from '../styles'
import CommunityHeader, {
  communityMenuState,
} from '../../../../components/Header/CommunityHeader/CommunityHeader'
import { ComponentContainer } from '../../../item/create/styles'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { HeaderWrapper } from '../../../item/addInfo/styles'
import {
  communityItemState,
  firstItemState,
  hasTriedUpload,
  imgItemListState,
  secondItemState,
} from '../../../../recoil/communityInfo'
import { Outlet, useNavigate } from 'react-router-dom'
import useCommunityImgUpload from '../../../../apis/s3/hooks/useCommunityImgUpload'
import { createItemCelebState, createItemNewCelebState } from '../../../../recoil/itemInfo'
import {
  selectedCelebState,
  selectedGroupState,
} from '../../../../components/SelectCeleb/SelectCeleb'

const Question = () => {
  const navigate = useNavigate()
  const [questionItem, setQuestionItem] = useRecoilState(communityItemState)
  const resetQuestionItem = useResetRecoilState(communityItemState)
  const [hasTriedToUpload, setHasTriedToUpload] = useRecoilState<boolean>(hasTriedUpload)
  const CommunityMenu = useRecoilValue(communityMenuState)

  const [imgItemList, setImageItemList] = useRecoilState(imgItemListState)

  const firstItem = useRecoilValue(firstItemState)
  const secondItem = useRecoilValue(secondItemState)
  const resetFirstItem = useResetRecoilState(firstItemState)
  const resetSecondItem = useResetRecoilState(secondItemState)
  const resetImgItemList = useResetRecoilState(imgItemListState)
  const resetCelebInfoInItem = useResetRecoilState(createItemCelebState)
  const resetSelectedCeleb = useResetRecoilState(selectedCelebState)
  const resetSelectedGroup = useResetRecoilState(selectedGroupState)
  const resetNewCeleb = useResetRecoilState(createItemNewCelebState)

  const {
    postCommunityImg: { mutate: mutateByImgUpload },
  } = useCommunityImgUpload()

  const uploadImg = async () => {
    // console.log(firstItem.description)
    // console.log(secondItem.description)
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
    // console.log('updatedImgItemList', updatedImgItemList)
    const newItemList = updatedImgItemList
      .filter((item) => item.itemId)
      .map(({ itemId, description, sortOrder }) => ({
        itemId: itemId,
        description: description,
        representFlag: sortOrder === 0,
        sortOrder: sortOrder,
      }))
    const newImgList = updatedImgItemList
      .filter((item) => item.imgFile)
      .map(({ imgFile, description, sortOrder }) => ({
        imgFile: imgFile,
        description: description,
        representFlag: sortOrder === 0,
        sortOrder: sortOrder,
      }))

    setQuestionItem({
      ...questionItem,
      itemList: newItemList,
    })
    // console.log('newImgList', newImgList)

    await mutateByImgUpload(newImgList)
    resetQuestionItem()
    resetFirstItem()
    resetSecondItem()
    resetImgItemList()
  }

  const onSubmit = async () => {
    setHasTriedToUpload(true)
    if (questionItem.title && questionItem.title.length > 10 && questionItem.title.length < 60) {
      if (CommunityMenu === '이 중에 뭐 살까') {
        if (
          (firstItem.imgUrl || firstItem.imgFile) &&
          (secondItem.imgUrl || secondItem.imgFile) &&
          firstItem.description &&
          secondItem.description &&
          questionItem.voteEndTime
        ) {
          await uploadImg()
        }
      } else if (CommunityMenu === '이거 어때') {
        await uploadImg()
      } else {
        if (questionItem.categoryNameList?.length ?? 0 > 0) {
          await uploadImg()
        }
      }
    }
  }

  useEffect(() => {
    setHasTriedToUpload(false)
  }, [CommunityMenu])

  const onBackClick = () => {
    resetFirstItem()
    resetSecondItem()
    resetQuestionItem()
    resetImgItemList()
    resetCelebInfoInItem()
    resetSelectedCeleb()
    resetSelectedGroup()
    resetNewCeleb()
    navigate('/community')
  }
  useEffect(() => {
    // popstate 이벤트 핸들러 등록
    const handlePopstate = () => {
      resetFirstItem()
      resetSecondItem()
      resetQuestionItem()
      resetImgItemList()
      resetCelebInfoInItem()
      resetSelectedCeleb()
      resetSelectedGroup()
      resetNewCeleb()
    }
    // 이벤트 핸들러 등록
    window.addEventListener('popstate', handlePopstate)

    // 컴포넌트가 언마운트될 때 이벤트 핸들러 제거
    return () => {
      window.removeEventListener('popstate', handlePopstate)
    }
  }, [])

  return (
    <QuestionContainer>
      <HeaderWrapper>
        <CommunityHeader backBtnClick={onBackClick}>
          <span className='submit' onClick={onSubmit}>
            등록
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
