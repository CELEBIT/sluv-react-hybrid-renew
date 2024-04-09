import React from 'react'
import { ContentFullContainer, HeaderWrapper, PageContainer } from '../../styles'
import Header from '../../../../components/Header/Header'
import EachNotice from './EachNotice/EachNotice'
import { Line } from '../../../community/detail/styles'
import useNoticeQuery from '../../../../apis/notice/hooks/useNoticeQuery'

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
        {tempData?.map((each, index) => {
          return (
            <>
              <EachNotice key={each.id} notice={each}></EachNotice>
              {index !== tempData.length - 1 && <Line></Line>}
            </>
          )
        })}
      </ContentFullContainer>
    </PageContainer>
  )
}

export default Notice
