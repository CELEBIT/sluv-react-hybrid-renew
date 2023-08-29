import React, { useState } from 'react'
import { ContentContainer, HeaderWrapper, PageContainer } from '../user/styles'
import Header from '../../components/Header/Header'
import { DeleteAccount, Menu, MenuTitle, SettingMenu, UpdateText } from './styles'
import { Divider } from '../item/detail/styles'
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch'
import { useNavigate } from 'react-router-dom'

const Settings = () => {
  const navigate = useNavigate()
  const [pushAlarmState, setPushAlarmState] = useState(false)
  const onClickPushAlarm = () => {
    setPushAlarmState(!pushAlarmState)
    // api call
  }
  return (
    <PageContainer>
      <HeaderWrapper>
        <Header title='설정' isModalHeader={false} hasArrow={true}></Header>
      </HeaderWrapper>
      <ContentContainer>
        <SettingMenu>
          <MenuTitle>계정</MenuTitle>
          <Menu>ezenjun@naver.com</Menu>
        </SettingMenu>
        <Divider></Divider>
        <SettingMenu>
          <MenuTitle>나의 정보</MenuTitle>
          <Menu>프로필 수정</Menu>
          <Menu>관심셀럽 편집</Menu>
        </SettingMenu>
        <Divider></Divider>
        <SettingMenu>
          <MenuTitle>알림</MenuTitle>
          <Menu>
            푸쉬 알림
            <ToggleSwitch switchState={pushAlarmState} onClick={onClickPushAlarm}></ToggleSwitch>
          </Menu>
        </SettingMenu>
        <Divider></Divider>
        <SettingMenu>
          <MenuTitle>서비스 정보</MenuTitle>
          <Menu onClick={() => navigate('./terms')}>서비스 이용 약관</Menu>
          <Menu onClick={() => navigate('./privacy')}>개인정보 처리방침</Menu>
          <Menu>
            현재 버전 1.0.2
            <UpdateText canUpdate={false}>최신 버전</UpdateText>
          </Menu>
        </SettingMenu>
        <Divider></Divider>
        <SettingMenu>
          <Menu>로그아웃</Menu>
        </SettingMenu>
        <Divider></Divider>
        <DeleteAccount>탈퇴하기</DeleteAccount>
      </ContentContainer>
    </PageContainer>
  )
}

export default Settings
