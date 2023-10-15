import React from 'react'
import { ContentFullContainer, HeaderWrapper, PageContainer } from '../../../styles'
import Header from '../../../../../components/Header/Header'
import EachNotice from '../EachNotice/EachNotice'
import styled from '@emotion/styled'
import { Common, Pretendard } from '../../../../../components/styles'
import { Line } from '../../../../community/detail/styles'
import useNoticeQuery from '../../../../../apis/notice/hooks/useNoticeQuery'
import { useParams } from 'react-router-dom'

const NoticeDetail = () => {
  const { id } = useParams()
  const { getNoticeDetail } = useNoticeQuery()
  const { data } = getNoticeDetail(Number(id))

  return (
    <PageContainer>
      <HeaderWrapper>
        <Header title='공지사항' isModalHeader={false} hasArrow={true}></Header>
      </HeaderWrapper>
      <ContentFullContainer>
        {data && <EachNotice key={data.id} notice={data}></EachNotice>}
        <Line></Line>
        <NoticeContentWrapper>
          <NoticeContent>{data?.content}</NoticeContent>
        </NoticeContentWrapper>
      </ContentFullContainer>
    </PageContainer>
  )
}

const NoticeContentWrapper = styled.div`
  display: flex;
  padding: 1.5rem;
  white-space: pre-wrap;
`

const NoticeContent = styled.p`
  ${Pretendard({ size: 17, weight: Common.bold.regular, color: Common.colors.BK })}
  margin: 0;
  line-height: 1.5625rem;
`

export default NoticeDetail
