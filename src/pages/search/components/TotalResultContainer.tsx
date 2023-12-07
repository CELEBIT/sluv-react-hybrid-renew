import React from 'react'
import useTotalSearchQuery from '../../../apis/search/hooks/useTotalSearchQuery'
import styled from '@emotion/styled'
import { Common, Pretendard } from '../../../components/styles'
import Item from '../../../components/RecommendedItem/Item'
import { useNavigate } from 'react-router-dom'
import QuestionListItem from '../../../components/QuestionListItem/QuestionListItem'
import UserCard from '../../home/components/WeeklyTopUser/UserCard/UserCard'

interface TotalResultContainerProps {
  keyword: string
}

const TotalResultContainer = ({ keyword }: TotalResultContainerProps) => {
  const navigate = useNavigate()
  const { searchTotal } = useTotalSearchQuery()
  const { data } = searchTotal(keyword)
  console.log(data)

  return (
    <>
      {(data?.itemList.length ?? 0) > 0 && (
        <>
          <TitleBar>
            <span>아이템</span>
          </TitleBar>
          <GridListWrap>
            {data?.itemList.map((item) => (
              <Item
                key={item.itemId}
                itemId={item.itemId}
                itemName={item.itemName}
                imgUrl={item.imgUrl}
                brandName={item.brandName}
                celebName={item.celebName}
                borderRadius={8}
                onClick={() => navigate(`/item/detail/${item.itemId}`)}
              />
            ))}
          </GridListWrap>
          <Divider />
        </>
      )}
      {(data?.itemList.length ?? 0) > 0 && (
        <>
          <TitleBar>
            <span>커뮤니티</span>
          </TitleBar>
          {data?.questionList.map((q) => (
            <QuestionListItem key={q.id} item={q} />
          ))}
          <Divider />
        </>
      )}
      {(data?.userList.length ?? 0) > 0 && (
        <>
          <TitleBar>
            <span>사용자</span>
          </TitleBar>
          <UserListWrap>
            {data?.userList.map((user) => (
              <UserCard
                key={user.id}
                imgUrl={user.profileImgUrl}
                userName={user.nickname}
                followStatus={user.followStatus}
                onClick={() => navigate(`/user/${user.id}`)}
              />
            ))}
          </UserListWrap>

          <Divider />
        </>
      )}
    </>
  )
}

export default TotalResultContainer

const TitleBar = styled.div`
  display: flex;
  padding: 0.5rem 1.25rem;
  margin-bottom: 1rem;

  span {
    ${Pretendard({
      size: 18,
      weight: Common.bold.semiBold,
      color: Common.colors.BK,
    })};
  }
`

const GridListWrap = styled.div`
  display: grid;
  justify-items: center;
  flex-grow: none;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: minmax(0, auto);
  row-gap: 1.5rem;
  column-gap: 0.625rem;
  padding: 0 1.25rem;

  > div {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`

const Divider = styled.div`
  width: 100%;
  height: 0.5rem;
  background-color: ${Common.colors.GR100};
  margin-top: 2.5rem;
  margin-bottom: 1.25rem;
`

const UserListWrap = styled.div`
  display: flex;
`
