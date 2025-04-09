import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { WithdrawDisplayState, WithdrawReasonState } from '..'
import useUserMypageQuery from '../../../../apis/user/hooks/useUserMypageQuery'
import Header from '../../../../components/Header/Header'
import TextArea from '../../../../components/TextField/TextArea/TextArea'
import { ReasonWrapper } from '../../../item/editRequest/styles'
import { HeaderWrapper, PageContainer } from '../../../user/styles'
import { Title } from '../styles'

const WithdrawReason = () => {
  const [reasonText, setReasonText] = useState<string>('')

  const {
    withdrawUser: { mutate: mutateByWithdrawUser },
  } = useUserMypageQuery()

  // API 용
  const [withdrawReason, setWithdrawReason] = useRecoilState(WithdrawReasonState)
  // 페이지 렌더링용
  const RequestDisplay = useRecoilValue(WithdrawDisplayState)

  const [infoValid, setInfoValid] = useState(true)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const onSubmit = () => {
    setHasSubmitted(true)
    if (reasonText) {
      setInfoValid(true)
      // mutate
      // console.log(withdrawReason)
      mutateByWithdrawUser(withdrawReason)
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
    <PageContainer>
      <HeaderWrapper>
        <Header isModalHeader={false} hasArrow={true} title='탈퇴하기'>
          <span className='submit' onClick={onSubmit}>
            완료
          </span>
        </Header>
      </HeaderWrapper>
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
    </PageContainer>
  )
}

export default WithdrawReason
