import React from 'react'
import { ContentFullContainer, HeaderWrapper, PageContainer } from '../../styles'
import Header from '../../../../components/Header/Header'
import EachNotice from './EachNotice/EachNotice'
import { Line } from '../../../community/detail/styles'
import useNoticeQuery from '../../../../apis/notice/hooks/useNoticeQuery'
import { EmptyStateContainer } from '../../../community/styles'
import EmptyState from '../../../../components/EmptyState'

const Notice = () => {
  const { getNoticeList } = useNoticeQuery()
  const { data } = getNoticeList()
  const tempData = data?.pages[0].content

  return (
    <PageContainer>
      <HeaderWrapper>
        <Header title='공지사항' isModalHeader={false} hasArrow={true}></Header>
      </HeaderWrapper>
      <ContentFullContainer>
        {tempData?.length ? (
          tempData.map((each, index) => {
            return (
              <>
                <EachNotice key={each.id} notice={each}></EachNotice>
                {index !== tempData.length - 1 && <Line></Line>}
              </>
            )
          })
        ) : (
          <EmptyStateContainer>
            <EmptyState
              icon={'save'}
              title={'공지사항이 없어요'}
              subtitle={`전달할 내용이 있으면
공지사항에 안내해 드릴게요`}
            ></EmptyState>
          </EmptyStateContainer>
        )}
      </ContentFullContainer>
    </PageContainer>
  )
}

export default Notice
