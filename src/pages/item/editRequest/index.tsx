import React from 'react'
import { EditReportContainer, EditReportListWrapper, ReasonWrapper, Title } from './styles'
import Header from '../../../components/Header/Header'
import DisplayField from '../../../components/TextField/DisplayField/DisplayField'
import { atomKeys } from '../../../config/atomKeys'
import { atom, useSetRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'

interface EditRequestItem {
  itemId: number
  itemWriterId: number | undefined
  itemWriterName: string | undefined
}
export interface EditRequestReason {
  editReqReason: string
  content: string
  displayText?: string
}
export const RequestEditItemState = atom<EditRequestItem>({
  key: atomKeys.requestEditItemState,
  default: { itemId: 0, itemWriterId: 0, itemWriterName: '' },
})
export const RequestEditReasonState = atom<EditRequestReason>({
  key: atomKeys.requestEditReasonState,
  default: { editReqReason: '', content: '' },
})

const EditRequest = () => {
  const navigate = useNavigate()
  const reasonList = [
    { editReqReason: 'WRONG_CELEB', displayText: '해당 셀럽의 아이템이 아니에요' },
    { editReqReason: 'WRONG_DATE_PLACE', displayText: '날짜 / 장소가 잘못 되었어요' },
    { editReqReason: 'WRONG_BRAND_ITEM_NAME', displayText: '브랜드 / 상품명이 잘못 되었어요' },
    { editReqReason: 'WRONG_PRICE', displayText: '가격대가 잘못 되었어요' },
    { editReqReason: 'MODIFY_IMG', displayText: '사진 변경을 요청해요' },
    { editReqReason: 'MODIFY_CATEGORY', displayText: '아이템 카테고리 변경을 요청해요' },
    { editReqReason: 'WRONG_LINK', displayText: '해당 상품의 구매 링크가 아니에요' },
    { editReqReason: 'ETC', displayText: '기타' },
  ]
  const setRequestReason = useSetRecoilState<EditRequestReason>(RequestEditReasonState)
  const onClickReason = (editReqReason: string, displayText: string) => {
    setRequestReason({ editReqReason: editReqReason, content: '', displayText: displayText })
    console.log('clicked')
    navigate('/item/detail/request-edit/reason')
  }
  return (
    <EditReportContainer>
      <Header isModalHeader={false} hasArrow={true} title='정보 수정 요청'></Header>
      <ReasonWrapper>
        <Title>정보 수정을 요청하는 이유를 알려주세요</Title>
        <EditReportListWrapper>
          {reasonList.map((reason) => {
            return (
              <DisplayField
                key={reason.editReqReason}
                onClick={() => onClickReason(reason.editReqReason, reason.displayText)}
              >
                <span>{reason.displayText}</span>
              </DisplayField>
            )
          })}
        </EditReportListWrapper>
      </ReasonWrapper>
    </EditReportContainer>
  )
}

export default EditRequest
