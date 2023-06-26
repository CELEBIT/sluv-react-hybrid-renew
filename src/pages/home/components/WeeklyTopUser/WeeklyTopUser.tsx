import React from 'react'
import { HomeTitle, ScrollComponentWrapper } from '../../styles'
import Filter from '../../../../components/FIlter/Filter'
import BlackFilter from '../../../../components/FIlter/BlackFilter'
import { FilterListWrapper, UserCardListWrapper } from './styles'
import UserCard from './UserCard/UserCard'
import InterestCelebList, {
  selectedInterestCelebState,
} from './InterestCelebList/interestCelebList'
import useGetHotSluverQuery from '../../../../apis/user/hooks/useGetHotSluverQuery'
import { useRecoilValue } from 'recoil'

const WeeklyTopUser = () => {
  const selectedInterestCeleb = useRecoilValue(selectedInterestCelebState)
  const {
    getHotSluver: { data: userList },
  } = useGetHotSluverQuery(selectedInterestCeleb ? selectedInterestCeleb : undefined)
  console.log('userList', userList)

  return (
    <ScrollComponentWrapper bgColor='gray'>
      <HomeTitle className='title'>이번주 인기 스러버</HomeTitle>
      <InterestCelebList></InterestCelebList>
      <UserCardListWrapper>
        {userList?.map((user, index) => {
          return (
            <UserCard
              key={user.id}
              rank={index + 1}
              borderRadius={16}
              imgUrl={user.profileImgUrl}
              followStatus={user.followStatus}
              userName={user.nickName}
            ></UserCard>
          )
        })}
      </UserCardListWrapper>
    </ScrollComponentWrapper>
  )
}

export default WeeklyTopUser
