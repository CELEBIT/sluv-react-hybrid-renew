import React from 'react'
import { HomeTitle, ScrollComponentWrapper } from '../../styles'
import Filter from '../../../../components/FIlter/Filter'
import BlackFilter from '../../../../components/FIlter/BlackFilter'
import { FilterListWrapper, UserCardListWrapper } from './styles'
import UserCard from './UserCard/UserCard'
import InterestCelebList from './InterestCelebList/interestCelebList'

const WeeklyTopUser = () => {
  return (
    <ScrollComponentWrapper bgColor='gray'>
      <HomeTitle className='title'>이번주 인기 스러버</HomeTitle>
      <InterestCelebList></InterestCelebList>
      <UserCardListWrapper>
        <UserCard
          rank={1}
          borderRadius={16}
          imgUrl='https://cdn.topstarnews.net/news/photo/202306/15348452_1127373_1953.jpg'
          followStatus={true}
          userName='이리노순둥도리'
        ></UserCard>
        <UserCard
          rank={2}
          imgUrl='https://cdn.topstarnews.net/news/photo/202306/15348452_1127373_1953.jpg'
          followStatus={false}
          userName='이리노순둥도리'
        ></UserCard>
        <UserCard
          rank={3}
          imgUrl='https://cdn.topstarnews.net/news/photo/202306/15348452_1127373_1953.jpg'
          followStatus={false}
          userName='이리노순둥도리'
        ></UserCard>
        <UserCard
          rank={4}
          imgUrl='https://cdn.topstarnews.net/news/photo/202306/15348452_1127373_1953.jpg'
          followStatus={false}
          userName='이리노순둥도리'
        ></UserCard>
        <UserCard
          rank={5}
          imgUrl='https://cdn.topstarnews.net/news/photo/202306/15348452_1127373_1953.jpg'
          followStatus={false}
          userName='이리노순둥도리'
        ></UserCard>
        <UserCard
          rank={6}
          imgUrl='https://cdn.topstarnews.net/news/photo/202306/15348452_1127373_1953.jpg'
          followStatus={false}
          userName='이리노순둥도리'
        ></UserCard>
      </UserCardListWrapper>
    </ScrollComponentWrapper>
  )
}

export default WeeklyTopUser
