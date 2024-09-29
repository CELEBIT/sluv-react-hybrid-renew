import React from 'react'
import Flex from '../Flex'
import { Title } from '../../pages/signup/styles'
import { ProfileContainer } from '../Profile/Profile'
import FixedBottomButton from '../FixedBottomButton/FixedBottomButton'
import { ReactComponent as DefaultProfile } from '../../assets/profile_big.svg'
import { ReactComponent as Welcome } from '../../assets/welcome_flower_130.svg'
import useUserMypageQuery from '../../apis/user/hooks/useUserMypageQuery'
import styled from '@emotion/styled'
import { Common, Pretendard } from '../styles'

function SignupComplete({ onNext }: { onNext: () => void }) {
  const { getMypageInfo } = useUserMypageQuery()
  const { data } = getMypageInfo()
  return (
    <Flex direction='column'>
      <Flex direction='column' justify='center' align='center'>
        <ProfileContainer>
          {data?.userInfo.profileImgUrl ? (
            <img src={data?.userInfo.profileImgUrl} alt='유저의 이미지' />
          ) : (
            <DefaultProfile />
          )}
          <Welcome className='welcome' />
        </ProfileContainer>
        <UserNameText>&lsquo;{data?.userInfo.nickName}&rsquo;님</UserNameText>
        <WelcomeText>환영해요!</WelcomeText>
        <SubText>스럽에서의 다양한 활동 기대할게요</SubText>
      </Flex>

      <FixedBottomButton label='완료' onClick={() => onNext()} />
    </Flex>
  )
}

const UserNameText = styled.span`
  ${Pretendard({ size: 32, weight: Common.bold.regular, color: Common.colors.PRI })}
`
const WelcomeText = styled.span`
  ${Pretendard({ size: 32, weight: Common.bold.regular, color: Common.colors.BK })}
`
const SubText = styled.span`
  ${Pretendard({ size: 18, weight: Common.bold.regular, color: Common.colors.GR600 })}
  margin-top: 1.875rem;
`
export default SignupComplete
