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
import { ReactComponent as DefaultProfile } from '../../../../assets/profile_medium_74.svg'
import { ReactComponent as DefaultProfileWithAdd } from '../../../../assets/profile_medium_add_74.svg'
import { Common } from '../../../../components/styles'
import useModals from '../../../../components/Modals/hooks/useModals'
import { modals } from '../../../../components/Modals'
import { useNavigate, useParams } from 'react-router-dom'
import useUserMypageQuery from '../../../../apis/user/hooks/useUserMypageQuery'
import { atom, useRecoilState, useSetRecoilState } from 'recoil'
import { atomKeys } from '../../../../config/atomKeys'
import { NavBar } from 'antd-mobile'

interface UserProfileProps {
  userInfo: {
    id: number
    nickName: string
    profileImgUrl: string
  }
}

export const selectedFollowTabState = atom<string>({
  key: atomKeys.selectedFollowTab,
  default: 'follower',
})

export const selectedUserName = atom<string>({
  key: atomKeys.selectedUserName,
  default: '',
})

const UserProfile = () => {
  const navigate = useNavigate()
  const { openModal } = useModals()
  const showMoreInterestCeleb = () => {
    openModal(modals.UserInterestCelebModal)
  }
  const { id } = useParams()
  const setFollowTab = useSetRecoilState(selectedFollowTabState)
  const setSelectedUserName = useSetRecoilState(selectedUserName)

  const getColorForCategory = (category: string) => {
    switch (category) {
      case '가수':
        return 'pink'
      case '배우':
        return 'orange'
      case '방송인':
        return 'yellow'
      case '스포츠인':
        return 'green'
      case '인플루언서':
        return 'blue'
      default:
        return ''
    }
  }

  const onClickFollower = (userName: string) => {
    setFollowTab('follower')
    setSelectedUserName(userName)
    navigate('./followlist')
  }
  const onClickFollowing = (userName: string) => {
    setFollowTab('following')
    setSelectedUserName(userName)
    navigate('./followlist')
  }
  if (!id) {
    // 현재 유저의 마이페이지
    const {
      getMypageInfo: { data },
    } = useUserMypageQuery()
    return (
      <ProfileContainer>
        <UserInfoWrapper>
          {data?.userInfo.profileImgUrl ? (
            <UserImg imgUrl={data?.userInfo.profileImgUrl}></UserImg>
          ) : (
            <DefaultProfileWithAdd style={{ flexShrink: 0 }}></DefaultProfileWithAdd>
          )}
          <InfoRightWrapper>
            <InfoTopWrapper>{data?.userInfo.nickName}</InfoTopWrapper>
            <InfoBottomWrapper>
              <FollowWrapper onClick={() => onClickFollower(data?.userInfo.nickName || '')}>
                <FollowText>팔로워</FollowText>
                <FollowNumber>{data?.followerCount}</FollowNumber>
              </FollowWrapper>
              <Line></Line>
              <FollowWrapper onClick={() => onClickFollowing(data?.userInfo.nickName || '')}>
                <FollowText>팔로잉</FollowText>
                <FollowNumber>{data?.followingCount}</FollowNumber>
              </FollowWrapper>
            </InfoBottomWrapper>
          </InfoRightWrapper>
        </UserInfoWrapper>
        <InterestCelebWrapper>
          <ChipWrapper>
            {data?.interestedCelebList.map((celeb) => {
              return (
                <ColorChip
                  key={celeb.id}
                  color={getColorForCategory(celeb.celebCategory)}
                  active={true}
                  size='small'
                >
                  {celeb.celebNameKr}
                </ColorChip>
              )
            })}
          </ChipWrapper>
          <ArrowDim>
            <ArrowWrapper onClick={showMoreInterestCeleb}>
              <MoreDown stroke={Common.colors.GR600} style={{ flexShrink: 0 }}></MoreDown>
            </ArrowWrapper>
          </ArrowDim>
        </InterestCelebWrapper>
      </ProfileContainer>
    )
  } else {
    // 다른 유저의 마이페이지
    const { getOtherUserMypageInfo } = useUserMypageQuery()
    const { data } = getOtherUserMypageInfo(Number(id))
    return (
      <ProfileContainer>
        <UserInfoWrapper>
          {data?.userInfo.profileImgUrl ? (
            <UserImg imgUrl={data?.userInfo.profileImgUrl}></UserImg>
          ) : (
            <DefaultProfile style={{ flexShrink: 0 }}></DefaultProfile>
          )}
          <InfoRightWrapper>
            <InfoTopWrapper>{data?.userInfo.nickName}</InfoTopWrapper>
            <InfoBottomWrapper>
              <FollowWrapper onClick={() => onClickFollower(data?.userInfo.nickName || '')}>
                <FollowText>팔로워</FollowText>
                <FollowNumber>{data?.followerCount}</FollowNumber>
              </FollowWrapper>
              <Line></Line>
              <FollowWrapper onClick={() => onClickFollowing(data?.userInfo.nickName || '')}>
                <FollowText>팔로잉</FollowText>
                <FollowNumber>{data?.followingCount}</FollowNumber>
              </FollowWrapper>
            </InfoBottomWrapper>
          </InfoRightWrapper>
        </UserInfoWrapper>
        <InterestCelebWrapper>
          <ChipWrapper>
            {data?.interestedCelebList.map((celeb) => {
              return (
                <ColorChip
                  key={celeb.id}
                  color={getColorForCategory(celeb.celebCategory)}
                  active={true}
                  size='small'
                >
                  {celeb.celebNameKr}
                </ColorChip>
              )
            })}
          </ChipWrapper>
          <ArrowDim>
            <ArrowWrapper onClick={showMoreInterestCeleb}>
              <MoreDown stroke={Common.colors.GR600} style={{ flexShrink: 0 }}></MoreDown>
            </ArrowWrapper>
          </ArrowDim>
        </InterestCelebWrapper>
      </ProfileContainer>
    )
  }
}

export default UserProfile
