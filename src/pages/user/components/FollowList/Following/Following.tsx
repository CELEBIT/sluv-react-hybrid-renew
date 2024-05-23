import React, { useEffect, useRef } from 'react'
import useFollowQuery from '../../../../../apis/user/hooks/useFollowQuery'
import { EmptyStateWrapper, FollowContainer, FollowRow, UserInfo } from '../Follower/Follower'
import UserImage from '../../../../../components/UserImage/UserImage'
import ButtonSmall from '../../../../../components/ButtonSmall/ButtonSmall'
import EmptyState from '../../../../../components/EmptyState'
import { useObserver } from '../../../../../hooks/useObserver'
import { useNavigate, useParams } from 'react-router-dom'
import Flex from '../../../../../components/Flex'
import { ReactComponent as Spinner } from '../../../../../assets/Spinner.svg'

const Following = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getUserFollowingList, getOtherUserFollowingList } = useFollowQuery()

  const { data, isFetching, isFetchingNextPage, fetchNextPage } = id
    ? getOtherUserFollowingList(Number(id))
    : getUserFollowingList()
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
        <EmptyStateWrapper>
          <EmptyState icon='save' title='팔로우한 사용자가 없어요'>
            {/* <ButtonSmall
              text='인기 사용자 보러가기'
              type='pri'
              onClick={() => console.log('clicked')}
            /> */}
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

export default Following
