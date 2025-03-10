import React, { useState } from 'react'
import { ContentContainer, HeaderWrapper, PageContainer } from '../user/styles'
import Header from '../../components/Header/Header'
import { DeleteAccount, IdInfoRow, Menu, MenuTitle, SettingMenu, UpdateText } from './styles'
import { Divider } from '../item/detail/styles'
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch'
import { useNavigate } from 'react-router-dom'
import useUserMypageQuery from '../../apis/user/hooks/useUserMypageQuery'
import storage from '../../utils/storage'
import useModals from '../../components/Modals/hooks/useModals'
import { modals } from '../../components/Modals'
import { ReactComponent as Apple } from '../../assets/apple_60.svg'
import { ReactComponent as Google } from '../../assets/google_60.svg'
import { ReactComponent as Kakao } from '../../assets/kakao_60.svg'

const Settings = () => {
  const navigate = useNavigate()
  const { openModal } = useModals()
  const [pushAlarmState, setPushAlarmState] = useState(false)

  const { getMarketingAgreeStatus, getIdInfo } = useUserMypageQuery()
  const { data } = getMarketingAgreeStatus
  const { data: idInfoData } = getIdInfo()

  const {
    termsAgree: { mutate },
  } = useUserMypageQuery()

  const onClickPushAlarm = () => {
    setPushAlarmState(!pushAlarmState)
    // api call
  }

  const onClickTermsToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation()
    mutate()
  }

  const onLogout = () => {
    openModal(modals.LogoutModal)
  }

  const onWidthdraw = () => {
    navigate('./withdraw')
  }

  return (
    <PageContainer>
      <HeaderWrapper>
        <Header
          title='설정'
          isModalHeader={false}
          hasArrow={true}
          backBtnClick={() => navigate('/user')}
        ></Header>
      </HeaderWrapper>
      <ContentContainer>
        <SettingMenu>
          <MenuTitle>계정</MenuTitle>
          <IdInfoRow>
            {idInfoData?.snsType === 'APPLE' && (
              <Apple
                style={{
                  flexShrink: 0,
                  width: `${24 * 0.0625}rem`,
                  height: `${24 * 0.0625}rem`,
                }}
              ></Apple>
            )}
            {idInfoData?.snsType === 'GOOGLE' && (
              <Google
                style={{
                  flexShrink: 0,
                  width: `${24 * 0.0625}rem`,
                  height: `${24 * 0.0625}rem`,
                }}
              ></Google>
            )}
            {idInfoData?.snsType === 'KAKAO' && (
              <Kakao
                style={{
                  flexShrink: 0,
                  width: `${24 * 0.0625}rem`,
                  height: `${24 * 0.0625}rem`,
                }}
              ></Kakao>
            )}
            {idInfoData?.email}
          </IdInfoRow>
        </SettingMenu>
        <Divider></Divider>
        <SettingMenu>
          <MenuTitle>나의 정보</MenuTitle>
          <Menu onClick={() => navigate('/settings/edit-profile')}>프로필 수정</Menu>
          <Menu onClick={() => navigate('/settings/select-celeb')}>관심셀럽 편집</Menu>
        </SettingMenu>
        <Divider></Divider>
        {/* <SettingMenu>
          <MenuTitle>알림</MenuTitle>
          <Menu>
            푸쉬 알림
            <ToggleSwitch
              isToggleOn={pushAlarmState}
              onToggleSwitch={onClickPushAlarm}
            ></ToggleSwitch>
          </Menu>
        </SettingMenu>
        <Divider></Divider> */}

        <SettingMenu>
          <MenuTitle>서비스 정보</MenuTitle>
          <Menu onClick={() => navigate('./terms')}>서비스 이용 약관</Menu>
          <Menu onClick={() => navigate('./privacy')}>개인정보 처리방침</Menu>
          <Menu onClick={() => navigate('/settings/marketing')}>
            광고성 정보 수신 및 마케팅 활용 동의
            {data && (
              <ToggleSwitch
                isToggleOn={data?.termsStatus}
                onToggleSwitch={(event) => onClickTermsToggle(event)}
              ></ToggleSwitch>
            )}
          </Menu>
          <Menu>
            현재 버전 1.0.2
            <UpdateText canUpdate={false}>최신 버전</UpdateText>
          </Menu>
        </SettingMenu>
        <Divider></Divider>
        <SettingMenu onClick={onLogout}>
          <Menu className='logout'>로그아웃</Menu>
        </SettingMenu>
        <Divider></Divider>
        <DeleteAccount onClick={onWidthdraw}>탈퇴하기</DeleteAccount>
      </ContentContainer>
    </PageContainer>
  )
}

export default Settings
