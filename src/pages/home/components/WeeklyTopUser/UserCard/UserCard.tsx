import React from 'react'
import { NickNameWrapper, UserCardWrapper, UserNickName, UserPhoto } from './styles'
import { ReactComponent as RankFirst } from '../../../../../assets/rank_1.svg'
import { ReactComponent as RankSecond } from '../../../../../assets/rank_2.svg'
import { ReactComponent as RankThird } from '../../../../../assets/rank_3.svg'
import FollowMediumButton from '../../../../../components/ButtonMedium/FollowMediumButton'
import useFollowQuery from '../../../../../apis/user/hooks/useFollowQuery'
import { IUserResult } from '../../../../../apis/user/userService'
import { ReactComponent as DefaultProfile } from '../../../../../assets/defaultProfile_40.svg'

interface UserCardProps {
  rank?: number
  imgUrl: string
  user: IUserResult
  followStatus?: boolean
  borderRadius?: number
  isMine: boolean
  onClick?: () => void
}

const UserCard = ({
  rank,
  imgUrl,
  followStatus,
  user,
  borderRadius,
  isMine,
  onClick,
}: UserCardProps) => {
  const {
    followUser: { mutate: mutateByFollow },
  } = useFollowQuery()
  const onClickFollow = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, userId: number) => {
    e.stopPropagation() // Stop propagation here
    mutateByFollow({ userId: userId })
  }
  return (
    <UserCardWrapper borderRadius={borderRadius} onClick={onClick}>
      {rank && rank <= 3 && (
        <div className='rank'>
          {rank === 1 ? (
            <RankFirst></RankFirst>
          ) : (
            <>{rank === 2 ? <RankSecond></RankSecond> : <RankThird></RankThird>}</>
          )}
        </div>
      )}
      {imgUrl ? (
        <UserPhoto imgUrl={imgUrl}></UserPhoto>
      ) : (
        <DefaultProfile style={{ width: '5rem', height: '5rem' }}></DefaultProfile>
      )}

      <NickNameWrapper>
        <UserNickName>{user?.nickName}</UserNickName>
      </NickNameWrapper>
      {isMine ? (
        <FollowMediumButton icon={false} active={false} type='disable'>
          내 프로필
        </FollowMediumButton>
      ) : (
        <>
          {followStatus ? (
            <FollowMediumButton
              icon={true}
              active={false}
              onClick={(e) => onClickFollow(e, user.id)}
            >
              팔로잉
            </FollowMediumButton>
          ) : (
            <FollowMediumButton
              icon={false}
              active={true}
              onClick={(e) => onClickFollow(e, user.id)}
            >
              팔로우
            </FollowMediumButton>
          )}
        </>
      )}
    </UserCardWrapper>
  )
}

export default UserCard
