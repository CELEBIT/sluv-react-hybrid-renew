import React, { useEffect, useState } from 'react'
import {
  EditReportContainer,
  EditReportListWrapper,
  ReasonWrapper,
  Title,
  ConfirmWrapper,
  AgreementBg,
  ConfirmTitle,
  AgreeTitle,
  AgreeDetail,
  Agreement,
  EachContainer,
} from './styles'
import Header from '../../../components/Header/Header'
import DisplayField from '../../../components/TextField/DisplayField/DisplayField'
import { atomKeys } from '../../../config/atomKeys'
import { atom, useRecoilValue, useSetRecoilState } from 'recoil'
import { useLocation, useNavigate } from 'react-router-dom'
import { reasonList, withdrawReasonList } from '../../../config/editReportMenu'
import useUserMypageQuery from '../../../apis/user/hooks/useUserMypageQuery'
import { HeaderWrapper, PageContainer } from '../../user/styles'
import ButtonLarge from '../../../components/ButtonLarge/ButtonLarge'

export interface WithdrawReason {
  reason: string
  content: string
}

export const WithdrawReasonState = atom<WithdrawReason>({
  key: atomKeys.withdrawReasonState,
  default: { reason: '', content: '' },
})

export const WithdrawDisplayState = atom<reasonList>({
  key: atomKeys.withdrawDisplayState,
  default: { reason: '', displayText: '' },
})
const RequestWithdraw = () => {
  const [confirmAgreement, setConfirmAgreement] = useState(false)
  const { getMypageInfo } = useUserMypageQuery()
  const { data } = getMypageInfo()
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
    <PageContainer>
      <HeaderWrapper>
        <Header isModalHeader={false} hasArrow={true} title='탈퇴하기'></Header>
      </HeaderWrapper>

      {confirmAgreement ? (
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
      ) : (
        <ConfirmWrapper>
          <ConfirmTitle>
            탈퇴 전, <br />
            아래 내용을 확인해 주세요!
          </ConfirmTitle>
          <AgreementBg>
            <Agreement>
              <EachContainer>
                <AgreeTitle>탈퇴 시 게시글 관리 규정</AgreeTitle>
                <AgreeDetail>
                  - 탈퇴 후, 아이템 게시글 및 커뮤니티 게시글(댓글/답글/투표 등)은 삭제되지 않아요{' '}
                  <br />
                </AgreeDetail>
                <AgreeDetail>
                  - 회원 정보 삭제로 사용자 본인의 개인 정보를 확인할 수 없으며,
                  옷장/팔로우/팔로워는 삭제되어요
                  <br />
                </AgreeDetail>
                <AgreeDetail>
                  - 사용자는 탈퇴 후, 기본 프로필 사진과 함께 &quot;탈퇴한 유저&quot;로 표기되어요
                  <br />
                </AgreeDetail>
              </EachContainer>
              <EachContainer>
                <AgreeTitle>탈퇴 후 재가입 규정</AgreeTitle>

                <AgreeDetail>
                  - 탈퇴 후 7일 뒤 재가입할 수 있어요
                  <br />
                </AgreeDetail>
                <AgreeDetail>
                  - 회원 정보 삭제로 이전 계정의 수정/편집은 불가능해요
                  <br />
                </AgreeDetail>
              </EachContainer>
            </Agreement>

            <ButtonLarge
              text='내용을 확인했어요'
              active={true}
              onClick={() => {
                setConfirmAgreement(!confirmAgreement)
              }}
            ></ButtonLarge>
          </AgreementBg>
        </ConfirmWrapper>
      )}
    </PageContainer>
  )
}

export default RequestWithdraw
