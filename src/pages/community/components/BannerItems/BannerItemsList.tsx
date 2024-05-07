import styled from '@emotion/styled'
import React from 'react'
import BannerItem from './BannerItem/BannerItem'
import useCommunityHomeQuery from '../../../../apis/question/hooks/useCommunityHomeQuery'
import { useNavigate } from 'react-router-dom'
import useQuestionListQuery from '../../../../apis/question/hooks/useQuestionListQuery'
import BannerBuyItem from './BannerItem/BannerBuyItem'
import { QuestionImg } from '../../../../apis/search/searchService'

const BannerItemsList = () => {
  const { getQuestionHotList } = useQuestionListQuery()
  const { data } = getQuestionHotList()
  const navigate = useNavigate()
  console.log(data)

  const imgList = [
    {
      imgUrl:
        'https://elasticbeanstalk-ap-northeast-2-931662394917.s3.ap-northeast-2.amazonaws.com/asset/community/post/a83faab9-8a26-40d0-8b46-3a371ba7767d.jpeg',
      description: 'ss',
      voteNum: 0,
      votePercent: 0,
      representFlag: true,
      sortOrder: 0,
    },
  ]

  const itemList = [
    {
      item: {
        itemId: 360,
        imgUrl:
          'https://elasticbeanstalk-ap-northeast-2-931662394917.s3.ap-northeast-2.amazonaws.com/asset/item/11-57-1.jpeg',
        brandName: '리포메이션',
        itemName: '플라워 오프숄더 니트 탑',
        celebName: '(여자)아이들 미연',
        scrapStatus: true,
      },
      description: 'sss',
      voteNum: 0,
      votePercent: 0,
      representFlag: false,
      sortOrder: 1,
    },
  ]
  // const combinedList = [
  //   ...(imgList?.filter((item) => item !== null) ?? []),
  //   ...(itemList?.filter((item) => item !== null) ?? []),
  // ]
  const sortedAList: QuestionImg[] = [
    ...imgList,
    ...itemList.map((item) => ({ imgUrl: item.item.imgUrl, sortOrder: item.sortOrder })),
  ]
    .map(({ imgUrl, sortOrder }) => ({ imgUrl, sortOrder }))
    .sort((a, b) => a.sortOrder - b.sortOrder)

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
                  key={item.id}
                  qtype={item.qtype}
                  imgUrl={item.imgList?.at(0)?.imgUrl ?? ''}
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
