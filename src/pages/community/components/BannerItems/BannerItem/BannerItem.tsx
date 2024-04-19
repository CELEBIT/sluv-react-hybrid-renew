import styled from '@emotion/styled'
import React from 'react'
import Badge from '../../../../../components/Badge/Badge'
import UserImage from '../../../../../components/UserImage/UserImage'
import { Common, Pretendard } from '../../../../../components/styles'
import { ReactComponent as DefaultProfile } from '../../../../../assets/defaultProfile_40.svg'
import CommunityBannerDefaultBg from '../../../../../assets/CommunityBannerDefaultBg.png'

export interface BannerItemProps {
  qtype: string
  imgUrl: string
  userImgUrl: string
  userName: string
  title: string
  content: string
  onClick: () => void
}

const BadgeColors = {
  Find: 'pink',
  Buy: 'green',
  How: 'yellow',
  default: 'blue',
}

const BannerItem = ({
  qtype,
  imgUrl,
  userImgUrl,
  userName,
  title,
  content,
  onClick,
}: BannerItemProps) => {
  const badgeColor = BadgeColors[qtype as keyof typeof BadgeColors] || BadgeColors.default

  if (imgUrl) {
    return (
      <BannerItemContainer imgUrl={imgUrl ? imgUrl : CommunityBannerDefaultBg} onClick={onClick}>
        <div>
          <Badge color={badgeColor}>
            {qtype === 'Find'
              ? '찾아주세요'
              : qtype === 'Buy'
              ? '이 중에 뭐 살까'
              : qtype === 'How'
              ? '이거 어때'
              : '추천해 줘'}
          </Badge>
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
      </BannerItemContainer>
    )
  } else {
    return (
      <DimmedItemContainer
        userImgUrl={userImgUrl ? userImgUrl : CommunityBannerDefaultBg}
        onClick={onClick}
      >
        <div>
          <Badge color={badgeColor}>
            {qtype === 'Find'
              ? '찾아주세요'
              : qtype === 'Buy'
              ? '이 중에 뭐 살까'
              : qtype === 'How'
              ? '이거 어때'
              : '추천해 줘'}
          </Badge>
        </div>
        <UserInfoRow>
          {userImgUrl ? (
            <UserImage size={20} imgUrl={userImgUrl}></UserImage>
          ) : (
            <DefaultProfile style={{ width: '1.25rem', height: '1.25rem' }}></DefaultProfile>
          )}
          <UserNickName>{userName}</UserNickName>
        </UserInfoRow>
        <QuestionTitleContent>
          {title} {content}
        </QuestionTitleContent>
        <Dim></Dim>
        <Blur></Blur>
      </DimmedItemContainer>
    )
  }
}

export default BannerItem

export const BannerItemContainer = styled.div<{ imgUrl: string }>`
  display: flex;
  position: relative;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: space-between;
  border-radius: 1rem;
  padding: 0.625rem;
  width: 11.375rem;
  height: 14.4375rem;
  background-image: url(${(props) => props.imgUrl});
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
`

export const DimmedItemContainer = styled.div<{ userImgUrl: string }>`
  display: flex;
  position: relative;
  flex-direction: column;
  flex-shrink: 0;
  border-radius: 1rem;
  padding: 0.625rem;
  width: 11.375rem;
  height: 14.4375rem;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  gap: 0.75rem;
  background-image: url(${(props) => props.userImgUrl});
  backdrop-filter: blur(40px);
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
export const Dim = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #00000033;
  z-index: -2;
`

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
  ${Pretendard({ size: 12, weight: Common.bold.thin, color: Common.colors.WH })}
`
const QuestionTitle = styled.span`
  ${Pretendard({ size: 14, weight: Common.bold.regular, color: Common.colors.WH })}
`

const QuestionTitleContent = styled.span`
  z-index: 5;
  ${Pretendard({ size: 17, weight: Common.bold.regular, color: Common.colors.WH })}
`
