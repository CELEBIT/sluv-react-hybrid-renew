import React from 'react'
import { HeaderWrapper, PageContainer } from '../../styles'
import Header from '../../../../components/Header/Header'
import { ReactComponent as Arrow } from '../../../../assets/arrow_18.svg'
import * as S from './styles'
import { Line } from '../../../community/detail/styles'
import ButtonLarge from '../../../../components/ButtonLarge/ButtonLarge'
import copyToClipboard from '../../../../utils/Share/copyToClipboard'
import { toast } from 'react-toastify'

const Help = () => {
  return (
    <PageContainer>
      <HeaderWrapper>
        <Header title='문의하기' isModalHeader={false} hasArrow={true}></Header>
      </HeaderWrapper>
      <S.Layout>
        <S.SubTitle>자주 묻는 질문</S.SubTitle>
        <S.QuestionContainer>
          <S.Left>
            <S.QuestionIcon>Q</S.QuestionIcon>
            <S.QuestionTitle>비즈니스 문의는 어디로 보내면 되나요?</S.QuestionTitle>
          </S.Left>
          {/* <Arrow></Arrow> */}
        </S.QuestionContainer>

        <Line></Line>
        <S.AnswerContainer>
          <Arrow style={{ flexShrink: 0, marginTop: '0.1875rem' }}></Arrow>
          <S.QuestionAnswer>
            광고 및 제휴와 관련된 비즈니스 문의는 celebit.sluv@gmail.com 로 연락해 주세요
          </S.QuestionAnswer>
        </S.AnswerContainer>
      </S.Layout>
      <S.BottomContainer>
        <ButtonLarge
          text='이메일 문의'
          active={true}
          onClick={() => {
            copyToClipboard('celebit.sluv@gmail.com')
            toast('이메일 주소가 복사되었어요')
          }}
        ></ButtonLarge>
      </S.BottomContainer>
    </PageContainer>
  )
}

export default Help
