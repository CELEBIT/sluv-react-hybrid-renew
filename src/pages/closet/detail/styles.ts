import styled from '@emotion/styled'
import { ClosetBoxModel, ClosetItemModel } from '../../../apis/closet/model'
import blueImage from '../../../assets/default_closet_inner_cover_blue.svg'
import orangeImage from '../../../assets/default_closet_inner_cover_yellow.svg'
import purpleImage from '../../../assets/default_closet_inner_cover_purple.svg'
import grayImage from '../../../assets/default_closet_inner_cover_black.svg'
import greenImage from '../../../assets/default_closet_inner_cover_green.svg'
import redImage from '../../../assets/default_closet_inner_cover_red.svg'
import { Common } from '../../../components/styles'

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-left: 0;

  ::-webkit-scrollbar {
    display: none;
  }

  .edit {
    padding-bottom: 4.375rem !important;
  }
`

export const ItemListGridContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 100%; */
  width: 100%;
  /* align-items: center; */
`

export const ItemListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-shrink: 0;
  gap: 0.5rem;
  row-gap: 1.5rem;
  width: 100%;
  padding: 1.25rem;
`

export const HeaderContainer = styled.header`
  width: 100%;
  padding: 0 1.25rem;
`

export const EmptyPageRoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80%;
`

export const EmptyBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 10rem;
  max-width: 12.875rem;
  font-family: 'Pretendard';

  & > svg {
    height: 2.25rem !important;
    margin-bottom: 0.75rem;
  }

  & > h3 {
    margin-top: 0;
    font-size: 1.0625rem;
    font-weight: 500;
    line-height: 1.25rem;
    text-align: center;
    color: #7b8894;
    margin-bottom: 0.375rem;
  }

  & > p {
    margin-top: 0;
    font-size: 0.8125rem;
    font-weight: 400;
    line-height: 1.125rem;
    text-align: center;
    color: #aeb5bc;
    margin-bottom: 1.25rem;
  }

  & > button {
    margin-top: 0;
    font-family: 'Pretendard';
    display: flex;
    align-content: center;
    justify-content: center;
    font-size: 0.9375rem;
    font-weight: 500;
    line-height: 1.125rem;
    border: 1px solid #eaecef;
    background: #fff;
    box-sizing: border-box;
    padding: 0.375rem 0.75rem 0.375rem 0.75rem;
    border-radius: 0.375rem;
    color: ${Common.colors.GR600};
  }
`

export const Body = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
`

export const BackgroundContainer = styled.div<{
  imgUrl?: ClosetBoxModel['coverImgUrl']
  colorScheme: ClosetBoxModel['colorScheme']
}>`
  display: flex;
  flex-shrink: 0;
  width: 100%;
  height: 12.5rem;
  background: ${({ imgUrl, colorScheme }) =>
    imgUrl ? `url(${imgUrl})` : `url(${getDefaultImageUrl(colorScheme)})`};
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
`

const getDefaultImageUrl = (colorScheme: ClosetBoxModel['colorScheme']) => {
  switch (colorScheme) {
    case 'BLUE':
      return blueImage
    case 'ORANGE':
      return orangeImage
    case 'PURPLE':
      return purpleImage
    case 'GRAY':
      return grayImage
    case 'GREEN':
      return greenImage
    case 'RED':
      return redImage
    case 'DEFAULT':
      return purpleImage
    default:
      return ''
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
  line-height: 1.125rem;
  font-size: 0.9375rem;
  color: #212529;
`

export const InnerItemGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 세 열을 동일한 크기로 설정 */
  grid-gap: 1.5rem 0.625rem; /* 행 간 간격 1.5rem, 열 간 간격 0.625rem */
  padding: 0 1.5rem;
  width: 100%; /* 필요한 경우 그리드의 너비를 조정 */
  padding-bottom: 4.375rem;
`

export const EditFooter = styled.footer`
  z-index: 99;
  position: fixed;
  bottom: 0;
  height: 3.75rem;
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
  padding-top: 0.5rem;
  gap: 0.5rem;
  width: 100%;

  & > p {
    margin: 0;
    font-family: Pretendard;
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 0.875rem;
    letter-spacing: 0rem;
    text-align: center;
    color: #fff;
  }
`

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 20px;
`

export const AnotherClosetBodyContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-height: 25rem;
  gap: 1rem;
  flex-direction: column;
  margin-bottom: 0.625rem;
  padding: 0.875rem 1.5rem;
  overflow-y: scroll;
  overflow-x: hidden;
`
