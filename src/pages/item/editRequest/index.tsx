import React, { useEffect, useState } from 'react'
import { EditReportContainer, EditReportListWrapper, ReasonWrapper, Title } from './styles'
import Header from '../../../components/Header/Header'
import DisplayField from '../../../components/TextField/DisplayField/DisplayField'
import { atomKeys } from '../../../config/atomKeys'
import { atom, useSetRecoilState } from 'recoil'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  editReasonList,
  reasonList,
  reportItemReasonList,
  reportUserReasonList,
} from '../../../config/editReportMenu'

interface EditRequestItem {
  itemId: number
  itemWriterId: number | undefined
  itemWriterName: string | undefined
}

export interface EditRequestReason {
  reason: string
  content: string
}
export const RequestEditItemState = atom<EditRequestItem>({
  key: atomKeys.requestEditItemState,
  default: { itemId: 0, itemWriterId: 0, itemWriterName: '' },
})
export const RequestEditReasonState = atom<EditRequestReason>({
  key: atomKeys.requestEditReasonState,
  default: { reason: '', content: '' },
})
export const RequestDisplayState = atom<reasonList>({
  key: atomKeys.requestDisplayState,
  default: { reason: '', displayText: '' },
})
const EditRequest = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [pageName, setPageName] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [reasonList, setReasonList] = useState<Array<reasonList>>([])

  // API 용
  const setRequestReason = useSetRecoilState<EditRequestReason>(RequestEditReasonState)
  // 페이지 렌더링용
  const setRequestDisplay = useSetRecoilState<reasonList>(RequestDisplayState)

  const onClickReason = (reason: string, displayText: string) => {
    setRequestReason({ reason: reason, content: '' })
    setRequestDisplay({ reason: reason, displayText: displayText })
    navigate('./reason')
  }
  useEffect(() => {
    if (pathname === '/item/detail/request-edit') {
      setPageName('정보 수정 요청')
      setTitle('정보 수정을 요청하는 이유를 알려주세요')
      setReasonList(editReasonList)
    } else if (pathname === '/item/detail/report-item') {
      setPageName('게시글 신고')
      setTitle('게시글을 신고하는 이유를 알려주세요')
      setReasonList(reportItemReasonList)
    } else {
      setPageName('사용자 신고')
      setTitle('사용자를 신고하는 이유를 알려주세요')
      setReasonList(reportUserReasonList)
    }
  }, [pathname])
  return (
    <EditReportContainer>
      <Header isModalHeader={false} hasArrow={true} title={pageName}></Header>
      <ReasonWrapper>
        <Title>{title}</Title>
        <EditReportListWrapper>
          {reasonList.map((reason) => {
            return (
              <DisplayField
                key={reason.reason}
                onClick={() => onClickReason(reason.reason, reason.displayText)}
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
