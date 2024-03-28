import React from 'react'
import { ContentContainer, HeaderWrapper, PageContainer } from '../../../user/styles'
import Header from '../../../../components/Header/Header'
import { ContentParagraphWrap, MainText } from '../../styles'

const Marketing = () => {
  return (
    <PageContainer>
      <HeaderWrapper>
        <Header
          title='마케팅 활용 및 광고성 정보 수신 동의'
          isModalHeader={false}
          hasArrow={true}
        ></Header>
      </HeaderWrapper>
      <ContentContainer>
        <MainText>스럽 마케팅 활용 및 광고성 정보 수신 동의</MainText>
        <ContentParagraphWrap>
          <p>
            개인/신용 정보의 선택적 수집∙이용, 제공에 대한 동의를 거부할 수 있습니다. 다만, 동의하지
            않을 경우 관련 이벤트, 공지사항 안내 등 이용 목적에 따른 혜택에 제한이 있을 수 있습니다.
            동의를 거부해도 서비스 이용이 가능하며, 동의한 경우에도 동의를 해제할 수 있습니다.
          </p>

          <p className='title'>1. 수집 및 이용목적</p>
          <p>편의제공, 마케팅 활동, 시장조사 및 서비스 개발연구 등을 목적으로 수집·이용</p>
          <p className='title'>2. 수집 및 이용항목</p>
          <p>성별, 연령대, e-mail, 접속 일시, IP 주소 등</p>

          <p className='title'>3. 보유기간</p>
          <p>동의 일로부터 회원 탈퇴, 마케팅 동의 해제 시까지 보유·이용</p>
        </ContentParagraphWrap>
      </ContentContainer>
    </PageContainer>
  )
}

export default Marketing
