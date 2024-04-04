import React, { useEffect, useState } from 'react'
import { EditReportContainer, ReasonWrapper, Title } from '../styles'
import Header from '../../../../components/Header/Header'
import TextArea from '../../../../components/TextField/TextArea/TextArea'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useLocation } from 'react-router-dom'
import useItemDetailQuery from '../../../../apis/item/hooks/useItemDetailQuery'
import useReportUserQuery from '../../../../apis/user/hooks/useReportUserQuery'
import useQuestionDetailQuery from '../../../../apis/question/hooks/useQuestionDetailQuery'
import { WithdrawDisplayState, WithdrawReasonState } from '..'
import useModals from '../../../../components/Modals/hooks/useModals'
import { modals } from '../../../../components/Modals'

const WithdrawReason = () => {
  const { openModal } = useModals()
  const { pathname } = useLocation()
  const [reasonText, setReasonText] = useState<string>('')

  // API 용
  const [withdrawReason, setWithdrawReason] = useRecoilState(WithdrawReasonState)
  // 페이지 렌더링용
  const RequestDisplay = useRecoilValue(WithdrawDisplayState)

  const [infoValid, setInfoValid] = useState(true)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const onSubmit = () => {
    setHasSubmitted(true)
    console.log(withdrawReason)
    if (reasonText) {
      setInfoValid(true)
      openModal(modals.ConfirmWithdrawModal)
      // mutate
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
    setWithdrawReason({
      ...withdrawReason,
      content: reasonText,
    })
  }, [reasonText])

  return (
    <EditReportContainer>
      <Header isModalHeader={false} hasArrow={true} title='탈퇴하기'>
        <span className='submit' onClick={onSubmit}>
          완료
        </span>
      </Header>
      <ReasonWrapper>
        <Title>{RequestDisplay?.displayText}</Title>
        <TextArea
          value={reasonText ?? ''}
          setValue={setReasonText}
          placeholder='활동을 중지하시는 이유가 궁금해요
사용자들이 더욱 행복한 활동을 할 수 있
도록 스럽 팀이 더욱 노력할게요
'
          error={hasSubmitted ? !infoValid : false}
          errorMsg='내용을 입력해 주세요'
        ></TextArea>
      </ReasonWrapper>
    </EditReportContainer>
  )
}

export default WithdrawReason
