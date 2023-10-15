import styled from '@emotion/styled'
import React from 'react'
import BannerItem from './BannerItem/BannerItem'
import useCommunityHomeQuery from '../../../../apis/question/hooks/useCommunityHomeQuery'

const BannerItemsList = () => {
  const { getCommunityBannerItems } = useCommunityHomeQuery()
  const { data } = getCommunityBannerItems()
  return (
    <BannerItemsListContainer>
      {data &&
        data.map((item) => {
          return (
            <BannerItem
              key={item.id}
              qtype={item.qtype}
              imgUrl='https://pbs.twimg.com/media/Flhh_ejakAMHdud?format=jpg&name=medium'
              title={item.title}
              userImgUrl={item.user.profileImgUrl}
              userName={item.user.nickName}
            ></BannerItem>
          )
        })}
    </BannerItemsListContainer>
  )
}

export default BannerItemsList

export const BannerItemsListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  overflow-x: scroll;
  gap: 0.6875rem;
  margin-top: 1rem;
  padding: 0 1.25rem 1.375rem 1.25rem;
  width: 100%;
  ::-webkit-scrollbar {
    display: none;
  }
`
