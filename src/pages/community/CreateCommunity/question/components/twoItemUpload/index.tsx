import React, { useEffect, useState } from 'react'
import {
  DefaultImageField,
  ImageWrapper,
  ItemName,
  ItemNameWrapper,
  TwoItemUploadWrapper,
} from './styles'
import { ReactComponent as Add } from '../../../../../../assets/add_18.svg'
import ItemNameInput from '../itemNameInput'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import {
  IselectedItem,
  communityItemState,
  firstItemState,
  imgItemListState,
  secondItemState,
} from '../../../../../../recoil/communityInfo'
import ExistingItem from './eachItemField/ExistingItem'
import UploadPhoto from './eachItemField/UploadPhoto'
import AddItem from './eachItemField/AddItem'

interface TwoItemUploadProps {
  onClick: any
}

const TwoItemUpload = ({ onClick }: TwoItemUploadProps) => {
  // 로직
  // 1. 사진/아이템 선택 페이지에서 순서대로 firstItem / secondItem에 저장
  // 2. firstItem / secondItem을 questionItem의 imgList / itemList 에 저장
  // 3. 완료 버튼 시 최종 업로드
  const [communityUploadInfo, setCommunityUploadInfo] = useRecoilState(communityItemState)
  const [imgItemList, setImgItemList] = useRecoilState(imgItemListState)
  const [firstItem, setFirstItem] = useRecoilState(firstItemState)
  const resetFirstItem = useResetRecoilState(firstItemState)
  const [secondItem, setSecondItem] = useRecoilState(secondItemState)
  const resetSecondItem = useResetRecoilState(secondItemState)

  const [firstItemName, setFirstItemName] = useState<string | null>(firstItem.description)
  const [secondItemName, setSecondItemName] = useState<string | null>(secondItem.description)

  const onDeleteItem = (item: IselectedItem) => {
    let newItemList

    if (item.itemId !== null) {
      newItemList = communityUploadInfo.itemList?.filter(
        (addedItem) => addedItem.itemId !== item.itemId,
      )
      setCommunityUploadInfo({
        ...communityUploadInfo,
        itemList: newItemList || null,
      })

      const newImgItemList = imgItemList.filter((addedItem) => addedItem.itemId !== item.itemId)
      setImgItemList(newImgItemList)

      if (firstItem.itemId === item.itemId) {
        resetFirstItem()
      }
      if (secondItem.itemId === item.itemId) {
        resetSecondItem()
      }
    } else {
      const newImgItemList = imgItemList.filter((addedItem) => addedItem.imgFile !== item.imgFile)
      setImgItemList(newImgItemList)

      if (firstItem.itemId === null && firstItem.imgFile === item.imgFile) {
        resetFirstItem()
      }
      if (secondItem.itemId === null && secondItem.imgFile === item.imgFile) {
        resetSecondItem()
      }
    }
  }

  useEffect(() => {
    setFirstItem((prevFirstItem) => ({
      ...prevFirstItem,
      description: firstItemName,
    }))
  }, [firstItemName, setFirstItem])

  useEffect(() => {
    setSecondItem((prevSecondItem) => ({
      ...prevSecondItem,
      description: secondItemName,
    }))
  }, [secondItemName, setSecondItem])

  return (
    <TwoItemUploadWrapper>
      {/* 둘중에 하나라도 선택 되었을 경우 */}
      {firstItem?.imgUrl || secondItem?.imgUrl || firstItem?.imgFile || secondItem?.imgFile ? (
        <ImageWrapper>
          {firstItem.itemId ? (
            // 스럽에 존재하는 아이템 선택
            <ExistingItem
              item={firstItem}
              className='left'
              onDelete={() => onDeleteItem(firstItem)}
            ></ExistingItem>
          ) : (
            <>
              {firstItem?.imgFile && (
                <UploadPhoto
                  imgFile={firstItem.imgFile}
                  className='left'
                  onDelete={() => onDeleteItem(firstItem)}
                ></UploadPhoto>
              )}
            </>
          )}
          {!firstItem.imgUrl && !firstItem.imgFile && <AddItem onClick={() => onClick()}></AddItem>}
          {/* 2번째 아이템 */}
          {secondItem?.itemId !== null ? (
            <ExistingItem
              item={secondItem}
              className='right'
              onDelete={() => onDeleteItem(secondItem)}
            ></ExistingItem>
          ) : (
            <>
              {secondItem.imgFile && (
                // 유저 갤러리에서 선택
                <UploadPhoto
                  imgFile={secondItem.imgFile}
                  className='right'
                  onDelete={() => onDeleteItem(secondItem)}
                ></UploadPhoto>
              )}
            </>
          )}
          {!secondItem.imgUrl && !secondItem.imgFile && (
            <AddItem onClick={() => onClick()}></AddItem>
          )}
        </ImageWrapper>
      ) : (
        // 둘 다 선택 x
        <DefaultImageField onClick={() => onClick()}>
          <Add></Add>아이템/사진을 올려주세요 (0/2)
        </DefaultImageField>
      )}
      <ItemNameWrapper>
        <ItemName className='left'>
          <ItemNameInput
            value={firstItemName ?? ''}
            setValue={setFirstItemName}
            placeholder='항목 이름 입력'
          ></ItemNameInput>
        </ItemName>
        <div className='divider' />
        <ItemName className='right'>
          <ItemNameInput
            value={secondItemName ?? ''}
            setValue={setSecondItemName}
            placeholder='항목 이름 입력'
          ></ItemNameInput>
        </ItemName>
      </ItemNameWrapper>
    </TwoItemUploadWrapper>
  )
}

export default TwoItemUpload
