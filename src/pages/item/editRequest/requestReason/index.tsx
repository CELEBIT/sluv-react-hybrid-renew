import React, { useEffect, useState } from 'react'
import { EditReportContainer, ReasonWrapper, Title } from '../styles'
import Header from '../../../../components/Header/Header'
import TextArea from '../../../../components/TextField/TextArea/TextArea'
import { EditRequestReason, RequestEditReasonState } from '..'
import { useRecoilState } from 'recoil'
// import useModals from '../../../../components/Modals/hooks/useModals'

const RequestReason = () => {
  //   const { openModal } = useModals()
  const [editRequestReason, setEditRequestReason] =
    useRecoilState<EditRequestReason>(RequestEditReasonState)
  const [reasonText, setReasonText] = useState<string | null>(editRequestReason.content)
  const [infoValid, setInfoValid] = useState(true)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const onSubmit = () => {
    setHasSubmitted(true)
    if (reasonText) {
      setEditRequestReason({
        ...editRequestReason,
        content: reasonText,
      })
      setInfoValid(true)
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
  }, [reasonText])

  return (
    <EditReportContainer>
      <Header isModalHeader={false} hasArrow={true} title='정보 수정 요청'>
        <span className='submit' onClick={onSubmit}>
          완료
        </span>
      </Header>
      <ReasonWrapper>
        <Title>{editRequestReason?.displayText}</Title>
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
