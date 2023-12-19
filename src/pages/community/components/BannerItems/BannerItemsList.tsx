import styled from '@emotion/styled'
import React from 'react'
import BannerItem from './BannerItem/BannerItem'
import useCommunityHomeQuery from '../../../../apis/question/hooks/useCommunityHomeQuery'
import { useNavigate } from 'react-router-dom'

const BannerItemsList = () => {
  const { getCommunityBannerItems } = useCommunityHomeQuery()
  const { data } = getCommunityBannerItems()
  const navigate = useNavigate()
  return (
    <BannerItemsListContainer>
      {data &&
        data.map((item) => {
          return (
            <BannerItem
              key={item.id}
              qtype={item.qtype}
              imgUrl={item.imgList?.at(0)?.imgUrl ?? ''}
              title={item.title}
              userImgUrl={item.user.profileImgUrl}
              userName={item.user.nickName}
              onClick={() => navigate(`./detail/${item.id}`)}
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
