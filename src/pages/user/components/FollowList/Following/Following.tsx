import React from 'react'
import useFollowQuery from '../../../../../apis/user/hooks/useFollowQuery'
import { EmptyStateWrapper, FollowContainer, FollowRow, UserInfo } from '../Follower/Follower'
import UserImage from '../../../../../components/UserImage/UserImage'
import ButtonSmall from '../../../../../components/ButtonSmall/ButtonSmall'
import EmptyState from '../../../../../components/EmptyState'

const Following = () => {
  const { getUserFollowingList } = useFollowQuery()
  const { data } = getUserFollowingList()
  console.log(data)

  const {
    followUser: { mutate: mutateByFollow },
  } = useFollowQuery()
  const onClickFollow = (userId: number) => {
    if (data) mutateByFollow({ userId: userId })
  }

  return (
    <FollowContainer>
      {data ? (
        <>
          {data?.pages[0].content.map((user) => {
            return (
              <FollowRow key={user.id}>
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
                  onClick={() => onClickFollow(user.id)}
                ></ButtonSmall>
              </FollowRow>
            )
          })}
        </>
      ) : (
        <EmptyStateWrapper>
          <EmptyState icon='save' title='팔로우한 사용자가 없어요'>
            <ButtonSmall
              text='인기 사용자 보러가기'
              type='pri'
              onClick={() => console.log('clicked')}
            />
          </EmptyState>
        </EmptyStateWrapper>
      )}
    </FollowContainer>
  )
}

export default Following
