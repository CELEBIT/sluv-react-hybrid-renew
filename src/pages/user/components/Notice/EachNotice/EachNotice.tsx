import styled from '@emotion/styled'
import React from 'react'
import { Common, Pretendard } from '../../../../../components/styles'
import { useNavigate } from 'react-router-dom'

interface EachNoticeProps {
  notice: Notice
}

export interface Notice {
  id?: number
  title: string
  content?: string
  createdAt: Date
  noticeType: string
}

const EachNotice = ({ notice }: EachNoticeProps) => {
  const navigate = useNavigate()
  return (
    <EachNoticeContainer onClick={() => navigate(`./${notice.id}`)}>
      <NoticeTitle>{notice.title}</NoticeTitle>
      <NoticeDate>{new Date(notice.createdAt).toLocaleDateString()}</NoticeDate>
    </EachNoticeContainer>
  )
}

const EachNoticeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 1.5rem;
`

const NoticeTitle = styled.span`
  ${Pretendard({ size: 18, weight: Common.bold.regular, color: Common.colors.BK })}
`

const NoticeDate = styled.span`
  ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.GR500 })}
`
export default EachNotice
