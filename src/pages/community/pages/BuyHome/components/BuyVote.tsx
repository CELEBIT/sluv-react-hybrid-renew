import React from 'react'
import * as S from './styles'
import VoteTwoItem from '../../../CreateCommunity/question/components/twoItemUpload/VoteTwoItem'
import { BuyHomeResult, SearchQuestionResult } from '../../../../../apis/search/searchService'
import UserImage from '../../../../../components/UserImage/UserImage'
import { Dot } from '../../../../../components/Dot/Dot'
import { ReactComponent as DefaultProfile } from '../../../../../assets/defaultProfile_40.svg'
import { getRemainingTime } from '../../../../../utils/utility'
import { useNavigate } from 'react-router-dom'
interface BuyVoteProps {
  item: BuyHomeResult
  selectedTab: string
}

function BuyVote({ item, selectedTab }: BuyVoteProps) {
  const navigate = useNavigate()
  const remainingTime = getRemainingTime(item.voteEndTime)
  return (
    <S.Container onClick={() => navigate(`/community/detail/${item.id}`)}>
      <S.UserInfo>
        <S.UserContainer>
          {item.user?.profileImgUrl ? (
            <UserImage size={36} imgUrl={item.user?.profileImgUrl}></UserImage>
          ) : (
            <DefaultProfile
              style={{ flexShrink: 0, width: '36px', height: '36px' }}
            ></DefaultProfile>
          )}
          <S.UserInfo>
            <S.UserName>{item.user.id !== -1 ? item.user.nickName : '탈퇴한 유저'}</S.UserName>
            <S.Status>
              <S.VoteStatus>{item.voteNum}명 투표 참여</S.VoteStatus>
              {remainingTime !== '진행중' && (
                <>
                  <Dot></Dot>
                  <S.VoteStatus color={remainingTime !== '투표 종료' ? 'red' : undefined}>
                    {remainingTime}
                  </S.VoteStatus>
                </>
              )}
            </S.Status>
          </S.UserInfo>
        </S.UserContainer>
      </S.UserInfo>
      <S.Title>{item.title}</S.Title>
      <VoteTwoItem item={item} selectedTab={selectedTab}></VoteTwoItem>
    </S.Container>
  )
}

export default BuyVote
