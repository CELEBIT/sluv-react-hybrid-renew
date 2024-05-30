import styled from '@emotion/styled'
import React from 'react'
import BannerItem from './BannerItem/BannerItem'
import useCommunityHomeQuery from '../../../../apis/question/hooks/useCommunityHomeQuery'
import { useNavigate } from 'react-router-dom'
import useQuestionListQuery from '../../../../apis/question/hooks/useQuestionListQuery'
import BannerBuyItem from './BannerItem/BannerBuyItem'
import { QuestionImg, SearchQuestionResult } from '../../../../apis/search/searchService'
import { InfiniteData } from '@tanstack/react-query'
import { GetPaginationResult } from '../../../../apis/core/type'

interface BannerItemsListProps {
  data: InfiniteData<GetPaginationResult<SearchQuestionResult>> | undefined
}

const BannerItemsList = ({ data }: BannerItemsListProps) => {
  // const { getQuestionHotList } = useQuestionListQuery()
  // const { data } = getQuestionHotList()
  const navigate = useNavigate()
  console.log(data)
  return (
    <BannerItemsListContainer>
      {data &&
        data?.pages.map((list) =>
          list.content.map((item) => {
            const combinedList = [
              ...(item?.imgList?.filter((item) => item !== null) ?? []),
              ...(item?.itemImgList?.filter((item) => item !== null) ?? []),
            ]
            const sortedList = combinedList.sort((a, b) => a.sortOrder - b.sortOrder)
            if (item.qtype !== 'Buy') {
              return (
                <BannerItem
                  key={item.id + item.content}
                  qtype={item.qtype}
                  imgUrl={sortedList.at(0)?.imgUrl ?? ''}
                  title={item.title}
                  userImgUrl={item.user.profileImgUrl}
                  userName={item.user.nickName}
                  content={item.content}
                  onClick={() => navigate(`./detail/${item.id}`)}
                ></BannerItem>
              )
            } else {
              return (
                <BannerBuyItem
                  key={item.id}
                  qtype={item.qtype}
                  sortedList={sortedList}
                  title={item.title}
                  userImgUrl={item.user.profileImgUrl}
                  userName={item.user.nickName}
                  onClick={() => navigate(`./detail/${item.id}`)}
                ></BannerBuyItem>
              )
            }
          }),
        )}
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
