import React from 'react'
import { UserCardWrapper, UserNickName, UserPhoto } from './styles'
import { ReactComponent as RankFirst } from '../../../../../assets/rank_1.svg'
import { ReactComponent as RankSecond } from '../../../../../assets/rank_2.svg'
import { ReactComponent as RankThird } from '../../../../../assets/rank_3.svg'
import FollowMediumButton from '../../../../../components/ButtonMedium/FollowMediumButton'

interface UserCardProps {
  rank?: number
  imgUrl: string
  userName: string
  followStatus?: boolean
  borderRadius?: number
  onClick: () => void
}

const UserCard = ({
  rank,
  imgUrl,
  followStatus,
  userName,
  borderRadius,
  onClick,
}: UserCardProps) => {
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
      <UserPhoto imgUrl={imgUrl}></UserPhoto>
      <UserNickName>{userName}</UserNickName>
      {followStatus ? (
        <FollowMediumButton icon={true} active={false} onClick={() => console.log('clicked')}>
          팔로잉
        </FollowMediumButton>
      ) : (
        <FollowMediumButton icon={false} active={true} onClick={() => console.log('clicked')}>
          팔로우
        </FollowMediumButton>
      )}
    </UserCardWrapper>
  )
}

export default UserCard
