import styled from '@emotion/styled'
import React from 'react'
import Badge from '../../../../../components/Badge/Badge'
import UserImage from '../../../../../components/UserImage/UserImage'
import { Common, Pretendard } from '../../../../../components/styles'

export interface BannerItemProps {
  qtype: string
  imgUrl: string
  userImgUrl: string
  userName: string
  title: string
}

const BadgeColors = {
  Find: 'pink',
  Buy: 'green',
  How: 'yellow',
  default: 'blue',
}

const BannerItem = ({ qtype, imgUrl, userImgUrl, userName, title }: BannerItemProps) => {
  const badgeColor = BadgeColors[qtype as keyof typeof BadgeColors] || BadgeColors.default
  return (
    <BannerItemContainer imgUrl={imgUrl}>
      <div>
        <Badge color={badgeColor}>
          {qtype === 'Find' ? '찾아주세요' : qtype === 'Buy' ? '이 중에 뭐 살까' : '이거 어때'}
        </Badge>
      </div>
      <ContentBoxContainer>
        <UserInfoRow>
          <UserImage
            size={20}
            imgUrl={'https://www.ascentkorea.com/wp-content/uploads/2022/11/bts-1024x657.jpg'}
          ></UserImage>
          <UserNickName>{userName}</UserNickName>
        </UserInfoRow>
        <QuestionTitle>{title}</QuestionTitle>
      </ContentBoxContainer>
    </BannerItemContainer>
  )
}

export default BannerItem

export const BannerItemContainer = styled.div<{ imgUrl: string }>`
  display: flex;
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
