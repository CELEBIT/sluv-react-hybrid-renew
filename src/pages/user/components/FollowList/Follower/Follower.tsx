import React, { useRef } from 'react'
import useFollowQuery from '../../../../../apis/user/hooks/useFollowQuery'
import styled from '@emotion/styled'
import ButtonSmall from '../../../../../components/ButtonSmall/ButtonSmall'
import UserImage from '../../../../../components/UserImage/UserImage'
import { Common, Pretendard } from '../../../../../components/styles'
import EmptyState from '../../../../../components/EmptyState'
import { useNavigate, useParams } from 'react-router-dom'
import { useObserver } from '../../../../../hooks/useObserver'
import { ReactComponent as Spinner } from '../../../../../assets/Spinner.svg'

import Flex from '../../../../../components/Flex'

const Follower = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getOtherUserFollowerList, getUserFollowerList } = useFollowQuery()
  const { data, isFetching, isFetchingNextPage, fetchNextPage } = id
    ? getOtherUserFollowerList(Number(id))
    : getUserFollowerList()
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
      {data ? (
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
        <EmptyStateWrapper>
          <EmptyState icon='save' title='팔로워가 없어요'>
            <ButtonSmall
              text='인기 사용자 보러가기'
              type='pri'
              onClick={() => console.log('clicked')}
            />
          </EmptyState>
        </EmptyStateWrapper>
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
  height: 100%;
  padding: 1rem 0;
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

export const EmptyStateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`

export default Follower
