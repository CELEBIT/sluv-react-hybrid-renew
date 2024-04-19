import React from 'react'
import useSearchQuery from '../../../apis/search/hooks/useSearchQuery'
import styled from '@emotion/styled'
import { Common, Pretendard } from '../../../components/styles'
import Item from '../../../components/RecommendedItem/Item'
import { useNavigate } from 'react-router-dom'
import QuestionListItem from '../../../components/QuestionListItem/QuestionListItem'
import UserCard from '../../home/components/WeeklyTopUser/UserCard/UserCard'
import { Line } from '../../community/detail/styles'
import { ReactComponent as Right } from '../../../assets/arrow_black_20.svg'
import EmptyState from '../../../components/EmptyState'
import { Divider as Divide } from '../../item/detail/styles'

interface TotalResultProps {
  keyword: string
}

const TotalResult = ({ keyword }: TotalResultProps) => {
  const navigate = useNavigate()
  const { searchTotal } = useSearchQuery()
  const { data } = searchTotal(keyword)

  return (
    <>
      {data?.itemList.length === 0 &&
        data.questionList.length === 0 &&
        data.userList.length === 0 && (
          <>
            <EmptyState
              icon='search'
              title='검색 결과가 없어요'
              subtitle='다른 키워드로 검색해 주시거나
철자와 띄어쓰기를 확인해 주세요'
            ></EmptyState>
            <Divide></Divide>
          </>
        )}
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
                size={105}
                borderRadius={8}
                onClick={() => navigate(`/item/detail/${item.itemId}`)}
              />
            ))}
          </GridListWrap>
          <Divider />
        </>
      )}
      {(data?.questionList.length ?? 0) > 0 && (
        <CommunityListWrap>
          <TitleBar>
            <span>커뮤니티</span>
            <Right></Right>
          </TitleBar>

          {data?.questionList.map((q, index) => (
            <>
              <QuestionListItem key={q.id} item={q} />
              {index !== data.questionList.length - 1 && <Line></Line>}
            </>
          ))}
          <Divider />
        </CommunityListWrap>
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
                user={user}
                followStatus={user.followStatus}
                isMine={user.isMine}
                onClick={user.isMine ? undefined : () => navigate(`/user/${user.id}`)}
              />
            ))}
          </UserListWrap>
          <Divider />
        </>
      )}
    </>
  )
}

export default TotalResult

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.4375rem 1.25rem;
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
  padding: 1rem 1.25rem 0 1.25rem;

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
const CommunityListWrap = styled.div`
  display: flex;
  flex-direction: column;
`

const UserListWrap = styled.div`
  display: flex;
  width: 100%;
  overflow-x: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`
