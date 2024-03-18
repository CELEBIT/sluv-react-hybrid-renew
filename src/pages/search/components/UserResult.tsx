import React, { useRef } from 'react'
import { useObserver } from '../../../hooks/useObserver'
import { useNavigate } from 'react-router-dom'
import useSearchQuery from '../../../apis/search/hooks/useSearchQuery'
import useFollowQuery from '../../../apis/user/hooks/useFollowQuery'
import UserImage from '../../../components/UserImage/UserImage'
import ButtonSmall from '../../../components/ButtonSmall/ButtonSmall'
import EmptyState from '../../../components/EmptyState'
import Flex from '../../../components/Flex'
import styled from '@emotion/styled'
import { Common, Pretendard } from '../../../components/styles'
import { ReactComponent as Spinner } from '../../../assets/Spinner.svg'
import { EmptyStateWrapper } from '../../user/components/FollowList/Follower/Follower'
import { EmptyStateContainer } from '../../../components/EmptyState/styles'
import { Divider } from '../../item/detail/styles'

type Props = {
  keyword: string
}

const UserResult = ({ keyword }: Props) => {
  const navigate = useNavigate()
  const { searchUser } = useSearchQuery()
  const { data, isFetching, isFetchingNextPage, fetchNextPage } = searchUser(keyword)
  console.log(data)
  console.log(isFetching)

  const {
    followUser: { mutate: mutateByFollow },
  } = useFollowQuery()

  const onClickFollow = (event: React.MouseEvent<HTMLButtonElement>, userId: number) => {
    event.stopPropagation()
    if (data) mutateByFollow({ userId: userId })
  }
  const bottom = useRef(null)
  const onIntersect = ([entry]: IntersectionObserverEntry[]) => {
    entry.isIntersecting && fetchNextPage()
  }
  useObserver({
    target: bottom,
    onIntersect,
  })

  return (
    <FollowContainer>
      {data && data.pages[0].content.length > 0 ? (
        <>
          {data?.pages.map(
            (item) =>
              item.content.length > 0 &&
              item.content.map((user) => {
                return (
                  <FollowRow key={user.id} onClick={() => navigate(`/user/${user.id}`)}>
                    <UserInfo>
                      <UserImage imgUrl={user.profileImgUrl} size={40}></UserImage>
                      {user.nickName}
                    </UserInfo>
                    <ButtonSmall
                      text={user.followStatus ? '팔로잉' : '팔로우'}
                      type='pri'
                      icon={user.followStatus ? true : false}
                      iconName='check'
                      active={user.followStatus ? false : true}
                      onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                        onClickFollow(event, user.id)
                      }
                    ></ButtonSmall>
                  </FollowRow>
                )
              }),
          )}
        </>
      ) : (
        <>
          <EmptyState
            icon='search'
            title='사용자 검색 결과가 없어요'
            subtitle='다른 키워드로 검색해 주시거나
철자와 띄어쓰기를 확인해 주세요'
          ></EmptyState>
          <Divider></Divider>
        </>
      )}
      <div ref={bottom} />
      {isFetching && !isFetchingNextPage && (
        <Flex justify='center' align='center' className='spinner'>
          <Spinner></Spinner>
        </Flex>
      )}
    </FollowContainer>
  )
}

export const FollowContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 100%; */
  /* padding: 1rem 0; */
`

export const FollowRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem 1.25rem;
`

export const UserInfo = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.5rem;

  ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.BK })};
`

export default UserResult
