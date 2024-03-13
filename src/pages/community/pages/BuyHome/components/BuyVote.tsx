import React from 'react'
import * as S from './styles'
import VoteTwoItem from '../../../CreateCommunity/question/components/twoItemUpload/VoteTwoItem'
import { SearchQuestionResult } from '../../../../../apis/search/searchService'
import UserImage from '../../../../../components/UserImage/UserImage'
import { Dot } from '../../../../../components/Dot/Dot'
import useQuestionDetailQuery from '../../../../../apis/question/hooks/useQuestionDetailQuery'
import { ReactComponent as Check } from '../../../../../assets/check_20.svg'
interface BuyVoteProps {
  item: SearchQuestionResult
  selectedTab: string
}

function BuyVote({ item, selectedTab }: BuyVoteProps) {
  const { getQuestionDetail } = useQuestionDetailQuery()
  const { data } = getQuestionDetail(item.id)
  return (
    <S.Container>
      <S.UserInfo>
        <S.UserContainer>
          <UserImage size={36} imgUrl={item.user.profileImgUrl} />
          <S.UserInfo>
            <S.UserName>{item.user.nickName}</S.UserName>
            <S.Status>
              <S.VoteStatus>{item.viewNum}명 투표 참여</S.VoteStatus>
              {selectedTab === '종료 임박' && (
                <S.VoteStatus color='red'>투표 종료 임박</S.VoteStatus>
              )}
              {(selectedTab === '종료 임박' || selectedTab === '종료') && <Dot></Dot>}

              {selectedTab === '종료' && <S.VoteStatus>투표 종료</S.VoteStatus>}
            </S.Status>
          </S.UserInfo>
        </S.UserContainer>
      </S.UserInfo>
      <S.Title>{item.title}</S.Title>
      {data && <VoteTwoItem item={item} data={data} selectedTab={selectedTab}></VoteTwoItem>}
    </S.Container>
  )
}

export default BuyVote
