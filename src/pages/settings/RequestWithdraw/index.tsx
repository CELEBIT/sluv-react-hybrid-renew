import React, { useEffect, useState } from 'react'
import { EditReportContainer, EditReportListWrapper, ReasonWrapper, Title } from './styles'
import Header from '../../../components/Header/Header'
import DisplayField from '../../../components/TextField/DisplayField/DisplayField'
import { atomKeys } from '../../../config/atomKeys'
import { atom, useRecoilValue, useSetRecoilState } from 'recoil'
import { useLocation, useNavigate } from 'react-router-dom'
import { reasonList, withdrawReasonList } from '../../../config/editReportMenu'
import useUserMypageQuery from '../../../apis/user/hooks/useUserMypageQuery'

export interface WithdrawReason {
  reason: string
  content: string
}

export const WithdrawReasonState = atom<WithdrawReason>({
  key: atomKeys.requestEditReasonState,
  default: { reason: '', content: '' },
})

export const WithdrawDisplayState = atom<reasonList>({
  key: atomKeys.requestDisplayState,
  default: { reason: '', displayText: '' },
})
const RequestWithdraw = () => {
  const {
    getMypageInfo: { data },
  } = useUserMypageQuery()
  const navigate = useNavigate()

  // API 용
  const setWithdrawReason = useSetRecoilState<WithdrawReason>(WithdrawReasonState)
  // 페이지 렌더링용
  const setRequestDisplay = useSetRecoilState<reasonList>(WithdrawDisplayState)

  const onClickReason = (reason: string, displayText: string) => {
    setWithdrawReason({ reason: reason, content: '' })
    setRequestDisplay({ reason: reason, displayText: displayText })
    navigate('./reason')
  }

  return (
    <EditReportContainer>
      <Header isModalHeader={false} hasArrow={true} title='탈퇴하기'></Header>
      <ReasonWrapper>
        <Title>{data?.userInfo.nickName}님, 활동을 중지하시는 이유가 궁금해요</Title>
        <EditReportListWrapper>
          {withdrawReasonList.map((reason) => {
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

export default RequestWithdraw
