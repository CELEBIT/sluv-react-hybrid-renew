import styled from '@emotion/styled'
import React from 'react'
import Badge from '../../../../../components/Badge/Badge'
import UserImage from '../../../../../components/UserImage/UserImage'
import { Common, Pretendard } from '../../../../../components/styles'
import { ReactComponent as DefaultProfile } from '../../../../../assets/defaultProfile_40.svg'
import CommunityBannerDefaultBg from '../../../../../assets/CommunityBannerDefaultBg.png'
import { QuestionImg } from '../../../../../apis/search/searchService'

export interface BannerItemProps {
  qtype: string
  sortedList: QuestionImg[]
  userImgUrl: string
  userName: string
  title: string
  onClick: () => void
}

const BadgeColors = {
  Find: 'pink',
  Buy: 'green',
  How: 'yellow',
  default: 'blue',
}

const BannerBuyItem = ({
  qtype,
  sortedList,
  userImgUrl,
  userName,
  title,
  onClick,
}: BannerItemProps) => {
  const badgeColor = BadgeColors[qtype as keyof typeof BadgeColors] || BadgeColors.default

  return (
    <BuyItemContainer onClick={onClick}>
      {Array.isArray(sortedList) && (sortedList?.length ?? 0) > 0 && sortedList[0] !== null && (
        <RecommendVote>
          {sortedList.map((vote) => {
            return <EachVotePhoto key={vote.sortOrder} imgUrl={vote.imgUrl ?? ''}></EachVotePhoto>
          })}
        </RecommendVote>
      )}
      <Dim></Dim>
      <div style={{ zIndex: '10' }}>
        <Badge color={badgeColor}>이 중에 뭐 살까</Badge>
      </div>
      <ContentBoxContainer>
        <UserInfoRow>
          {userImgUrl ? (
            <UserImage size={20} imgUrl={userImgUrl}></UserImage>
          ) : (
            <DefaultProfile style={{ width: '1.25rem', height: '1.25rem' }}></DefaultProfile>
          )}
          <UserNickName>{userName}</UserNickName>
        </UserInfoRow>
        <QuestionTitle>{title}</QuestionTitle>
      </ContentBoxContainer>
    </BuyItemContainer>
  )
}

export default BannerBuyItem

export const BuyItemContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: space-between;
  border-radius: 1rem;
  padding: 0.625rem;
  width: 11.375rem;
  height: 14.4375rem;
  overflow: hidden;
`
export const Dim = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 3%;
  background-color: ${Common.colors.BK};
  z-index: 3;
`

const RecommendVote = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 0;
  left: 0;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  gap: 0.125rem;
  border-radius: 0.5rem;
  overflow: hidden;
`

const EachVotePhoto = styled.div<{ imgUrl: string }>`
  display: flex;
  flex-shrink: 0;
  width: 50%;
  height: 100%;
  background-color: grey;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  background-image: url(${(props) => props.imgUrl});
`

export const ContentBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.375rem;
  padding: 0.625rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
`
// export const Dim = styled.div`
//   position: absolute;
//   left: 0;
//   top: 0;
//   width: 100%;
//   height: 100%;
//   background: #00000033;
//   z-index: -2;
// `

export const Blur = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #ffffff40;
  backdrop-filter: blur(15px);
  z-index: -1;
`

export const UserInfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
`

const UserNickName = styled.span`
  line-height: 14.32px;
  ${Pretendard({ size: 12, weight: Common.bold.thin, color: Common.colors.WH })}
`
const QuestionTitle = styled.span`
  ${Pretendard({ size: 14, weight: Common.bold.regular, color: Common.colors.WH })}
`
