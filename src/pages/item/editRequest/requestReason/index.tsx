import React, { useEffect, useState } from 'react'
import { EditReportContainer, ReasonWrapper, Title } from '../styles'
import Header from '../../../../components/Header/Header'
import TextArea from '../../../../components/TextField/TextArea/TextArea'
import {
  EditRequestReason,
  RequestDisplayState,
  RequestEditItemState,
  RequestEditReasonState,
} from '..'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useLocation } from 'react-router-dom'
import useItemDetailQuery from '../../../../apis/item/hooks/useItemDetailQuery'
import useReportUserQuery from '../../../../apis/user/hooks/useReportUserQuery'
import useQuestionDetailQuery from '../../../../apis/question/hooks/useQuestionDetailQuery'

const RequestReason = () => {
  const { pathname } = useLocation()
  const [title, setTitle] = useState<string>('')
  const [reasonText, setReasonText] = useState<string>('')

  const requestItem = useRecoilValue(RequestEditItemState)
  // API 용
  const [editRequestReason, setEditRequestReason] =
    useRecoilState<EditRequestReason>(RequestEditReasonState)
  // Display 용
  const requestDisplay = useRecoilValue(RequestDisplayState)

  const [infoValid, setInfoValid] = useState(true)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const {
    requestEditItem: { mutate: mutateByRequestEditItem },
    reportItem: { mutate: mutateByReportItem },
  } = useItemDetailQuery()

  const {
    reportQuestion: { mutate: mutateByReportQuestion },
    reportComment: { mutate: mutateByReportComment },
  } = useQuestionDetailQuery()

  const {
    reportUser: { mutate: mutateByReportUser },
  } = useReportUserQuery()
  const onSubmit = () => {
    setHasSubmitted(true)
    if (reasonText) {
      setInfoValid(true)
      if (pathname === '/item/detail/request-edit/reason') {
        mutateByRequestEditItem({ itemId: requestItem.itemId, requestContent: editRequestReason })
      } else if (pathname === '/item/detail/report-item/reason') {
        mutateByReportItem({ itemId: requestItem.itemId, requestContent: editRequestReason })
      } else if (pathname === '/community/detail/report-question/reason') {
        mutateByReportQuestion({
          questionId: requestItem.itemId,
          requestContent: editRequestReason,
        })
      } else if (pathname === '/community/comment/report-comment/reason') {
        mutateByReportComment({
          commentId: requestItem.itemId,
          requestContent: editRequestReason,
        })
      } else {
        mutateByReportUser({ userId: requestItem.itemWriterId, requestContent: editRequestReason })
      }
    } else {
      setInfoValid(false)
    }
  }

  useEffect(() => {
    if (hasSubmitted) {
      if (reasonText) {
        setInfoValid(true)
      } else {
        setInfoValid(false)
      }
    }
    setEditRequestReason({
      ...editRequestReason,
      content: reasonText,
    })
  }, [reasonText])

  useEffect(() => {
    if (pathname === '/item/detail/request-edit/reason') {
      setTitle('정보 수정 요청')
    } else if (
      pathname === '/item/detail/report-item/reason' ||
      pathname === '/community/detail/report-question/reason'
    ) {
      setTitle('게시글 신고')
    } else if (pathname === '/community/comment/report-comment/reason') {
      setTitle('댓글 신고')
    } else {
      setTitle('사용자 신고')
    }
  }, [pathname])

  return (
    <EditReportContainer>
      <Header isModalHeader={false} hasArrow={true} title={title}>
        <span className='submit' onClick={onSubmit}>
          완료
        </span>
      </Header>
      <ReasonWrapper>
        <Title>{requestDisplay?.displayText}</Title>
        <TextArea
          value={reasonText ?? ''}
          setValue={setReasonText}
          placeholder='해당 게시글을 업로드한 스러버에게
요청이 전달돼요! 
즐거운 활동을 위해 친절하게 요청해
주세요
'
          error={hasSubmitted ? !infoValid : false}
          errorMsg='내용을 입력해 주세요'
        ></TextArea>
      </ReasonWrapper>
    </EditReportContainer>
  )
}

export default RequestReason
