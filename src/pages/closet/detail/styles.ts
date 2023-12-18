import styled from '@emotion/styled'
import { ClosetBoxModel, ClosetItemModel } from '../../../apis/closet/model'

export const Root = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-direction: column;
  z-index: 5;
`

export const HeaderContainer = styled.header`
  width: 100%;
  margin-bottom: 8px;
`

export const EmptyPageRoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

export const EmptyBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 160px;
  max-width: 206px;
  font-family: Pretendard;

  & > svg {
    height: 36px !important;
    margin-bottom: 12px;
  }

  & > h3 {
    margin-top: 0;
    font-size: 17px;
    font-weight: 500;
    line-height: 20px;
    text-align: center;
    color: #7b8894;
    margin-bottom: 6px;
  }

  & > p {
    margin-top: 0;
    font-size: 13px;
    font-weight: 400;
    line-height: 18px;
    text-align: center;
    color: #aeb5bc;
    margin-bottom: 20px;
  }

  & > button {
    margin-top: 0;
    display: flex;
    align-content: center;
    justify-content: center;
    font-size: 15px;
    font-weight: 500;
    line-height: 18px;
    border: 1px solid #eaecef;
    background: #fff;
    box-sizing: border-box;
    padding: 6px 12px 6px 12px;
    border-radius: 6px;
  }
`

export const Body = styled.div`
  display: flex;
  position: absolute;
  top: 50px;
  height: 100%;
  width: 100%;
`

export const BackgroundContainer = styled.div<{
  imgUrl?: ClosetBoxModel['coverImgUrl']
  colorScheme: ClosetBoxModel['colorScheme']
}>`
  position: fixed;
  width: 100%;
  height: 200px;

  background: url(${({ imgUrl, colorScheme }) =>
      imgUrl ? imgUrl : getDefaultImageUrl(colorScheme)})
    no-repeat center center;
  background-size: cover;
  z-index: -1;
`

const getDefaultImageUrl = (colorScheme: ClosetBoxModel['colorScheme']) => {
  switch (colorScheme) {
    case 'BLUE':
      return 'src/assets/default_closet_inner_cover_blue.svg'
    case 'ORANGE':
      return 'src/assets/default_closet_inner_cover_yellow.svg'
    case 'PURPLE':
      return 'src/assets/default_closet_inner_cover_purple.svg'
    case 'GRAY':
      return 'src/assets/default_closet_inner_cover_black.svg'
    case 'GREEN':
      return 'src/assets/default_closet_inner_cover_green.svg'
    case 'RED':
      return 'src/assets/default_closet_inner_cover_red.svg'
    case 'DEFAULT':
      return 'src/assets/default_closet_inner_cover_purple.svg'
  }
}

export const ContentContainer = styled.div`
  position: absolute;
  top: 29%; /* 초기에는 .background 아래에 위치 */
  left: 0;
  width: 100%;
  min-height: 70%;
  background-color: white;
  z-index: 1;
  transition: top 0.5s ease;
  overflow: auto;
`

export const SubHeaderEditText = styled.p`
  cursor: pointer;
  font-weight: 500;
  font-family: Pretendard;
  line-height: 18px;
  font-size: 15px;
  color: #212529;
`

export const InnerItemGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 세 열을 동일한 크기로 설정 */
  grid-gap: 24px 10px; /* 행 간 간격 24px, 열 간 간격 10px */
  width: 100%; /* 필요한 경우 그리드의 너비를 조정 */
`

export const EditFooter = styled.footer`
  z-index: 99;
  position: fixed;
  bottom: 0;
  height: 92px;
  width: 100%;
  background: #454381;
`
export const FooterLayout = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  align-items: flex-start;
`

export const FooterContentContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 8px;
  gap: 8px;
  width: 100%;

  & > p {
    margin: 0;
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 500;
    line-height: 14px;
    letter-spacing: 0px;
    text-align: center;
    color: #fff;
  }
`

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 1.25rem;
`

export const AnotherClosetBodyContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-height: 400px;
  gap: 16px;
  flex-direction: column;
  margin-bottom: 10px;
  padding: 14px 24px;
  overflow-y: scroll;
`
