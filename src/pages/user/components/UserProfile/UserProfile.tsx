import React from 'react'
import {
  ArrowDim,
  ArrowWrapper,
  ChipWrapper,
  FollowNumber,
  FollowText,
  FollowWrapper,
  InfoBottomWrapper,
  InfoRightWrapper,
  InfoTopWrapper,
  InterestCelebWrapper,
  Line,
  ProfileContainer,
  UserImg,
  UserInfoWrapper,
} from './styles'
import ColorChip from '../../../../components/Chip/ColorChip'
import { ReactComponent as MoreDown } from '../../../../assets/arrow_down_18.svg'
import { Common } from '../../../../components/styles'

interface UserProfileProps {
  userInfo: {
    id: number
    nickName: string
    profileImgUrl: string
  }
}

const UserProfile = () => {
  return (
    <ProfileContainer>
      <UserInfoWrapper>
        <UserImg imgUrl=''></UserImg>
        <InfoRightWrapper>
          <InfoTopWrapper>이리노순둥도리</InfoTopWrapper>
          <InfoBottomWrapper>
            <FollowWrapper>
              <FollowText>팔로워</FollowText>
              <FollowNumber>10</FollowNumber>
            </FollowWrapper>
            <Line></Line>
            <FollowWrapper>
              <FollowText>팔로잉</FollowText>
              <FollowNumber>10</FollowNumber>
            </FollowWrapper>
          </InfoBottomWrapper>
        </InfoRightWrapper>
      </UserInfoWrapper>
      <InterestCelebWrapper>
        <ChipWrapper>
          <ColorChip color='pink' active={true} size='small'>
            뉴진스
          </ColorChip>
          <ColorChip color='pink' active={true} size='small'>
            정유미A
          </ColorChip>
          <ColorChip color='orange' active={true} size='small'>
            뉴진스
          </ColorChip>
          <ColorChip color='orange' active={true} size='small'>
            뉴진스
          </ColorChip>
          <ColorChip color='yellow' active={true} size='small'>
            뉴진스
          </ColorChip>
          <ColorChip color='yellow' active={true} size='small'>
            뉴진스
          </ColorChip>
          <ColorChip color='green' active={true} size='small'>
            뉴진스
          </ColorChip>
          <ColorChip color='blue' active={true} size='small'>
            뉴진스
          </ColorChip>
        </ChipWrapper>
        <ArrowDim>
          <ArrowWrapper>
            <MoreDown stroke={Common.colors.GR600} style={{ flexShrink: 0 }}></MoreDown>
          </ArrowWrapper>
        </ArrowDim>
      </InterestCelebWrapper>
    </ProfileContainer>
  )
}

export default UserProfile
