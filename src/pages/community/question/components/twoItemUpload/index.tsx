import React, { useEffect, useState } from 'react'
import {
  DefaultImageField,
  ImageWrapper,
  ItemName,
  ItemNameWrapper,
  TwoItemUploadWrapper,
} from './styles'
import { ReactComponent as Add } from '../../../../../assets/add_18.svg'
import ItemNameInput from '../itemNameInput'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  communityItemState,
  firstItemState,
  secondItemState,
} from '../../../../../recoil/communityInfo'
import ExistingItem from './eachItemField/ExistingItem'
import UploadPhoto from './eachItemField/UploadPhoto'
import AddItem from './eachItemField/AddItem'

const TwoItemUpload = () => {
  // 로직
  // 1. 사진/아이템 선택 페이지에서 순서대로 firstItem / secondItem에 저장
  // 2. firstItem / secondItem을 questionItem의 imgList / itemList 에 저장
  // 3. 완료 버튼 시 최종 업로드
  const [questionItem, setQuestionItem] = useRecoilState(communityItemState)
  const [firstItem, setFirstItem] = useRecoilState(firstItemState)
  const [secondItem, setSecondItem] = useRecoilState(secondItemState)
  const [firstItemName, setFirstItemName] = useState<string>('')
  const [secondItemName, setSecondItemName] = useState<string>('')

  useEffect(() => {
    setFirstItem({ ...firstItem, description: firstItemName })
    console.log(firstItem)
    setSecondItem({ ...secondItem, description: secondItemName })
    console.log(secondItem)
  }, [firstItemName, secondItemName])
  return (
    <TwoItemUploadWrapper>
      {/* 둘중에 하나라도 선택 되었을 경우 */}
      {firstItem?.imgUrl || secondItem?.imgUrl ? (
        <ImageWrapper>
          {firstItem?.itemId ? (
            // 스럽에 존재하는 아이템 선택
            <ExistingItem
              item={firstItem}
              className='left'
              onDelete={() => alert('삭제')}
            ></ExistingItem>
          ) : (
            <>
              {firstItem?.imgUrl && (
                // 유저 갤러리에서 선택
                <UploadPhoto
                  imgUrl={firstItem.imgUrl}
                  className='left'
                  onDelete={() => alert('삭제')}
                ></UploadPhoto>
              )}
            </>
          )}
          {!firstItem.imgUrl && <AddItem></AddItem>}
          {/* 2번째 아이템 */}
          {secondItem?.itemId ? (
            <ExistingItem
              item={secondItem}
              className='right'
              onDelete={() => alert('삭제')}
            ></ExistingItem>
          ) : (
            <>
              {secondItem?.imgUrl && (
                // 유저 갤러리에서 선택
                <UploadPhoto
                  imgUrl={secondItem.imgUrl}
                  className='right'
                  onDelete={() => alert('삭제')}
                ></UploadPhoto>
              )}
            </>
          )}
          {!secondItem.imgUrl && <AddItem></AddItem>}
        </ImageWrapper>
      ) : (
        // 둘 다 선택 x
        <DefaultImageField onClick={() => alert('사진/아이템업로드')}>
          <Add></Add>아이템/사진을 올려주세요 (0/2)
        </DefaultImageField>
      )}
      <ItemNameWrapper>
        <ItemName className='left'>
          <ItemNameInput
            value={firstItemName}
            setValue={setFirstItemName}
            placeholder='항목 이름 입력'
          ></ItemNameInput>
        </ItemName>
        <div className='divider' />
        <ItemName className='right'>
          <ItemNameInput
            value={secondItemName}
            setValue={setSecondItemName}
            placeholder='항목 이름 입력'
          ></ItemNameInput>
        </ItemName>
      </ItemNameWrapper>
    </TwoItemUploadWrapper>
  )
}

export default TwoItemUpload
