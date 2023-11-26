import styled from '@emotion/styled'
import { Common, Pretendard } from '../../components/styles'
export const PageContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: space-between;
  margin-left: calc(-50vw + 50%);
  width: 100vw;
  height: 100%;
  max-height: 100vh;
  padding-left: 0;
  background-color: white;

  ::-webkit-scrollbar {
    display: none;
  }

  .headerRight {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.25rem;
  }
`

export const HeaderWrapper = styled.header`
  padding: 0 1.25rem;
`
export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll; /* Enable scrolling for the content */
  height: 100%;
  width: 100%;
  padding-bottom: 3.75rem;
  ::-webkit-scrollbar {
    display: none;
  }
`

export const ContentFullContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: 100%;
  width: 100%;
  ::-webkit-scrollbar {
    display: none;
  }
`

export const StickyTabContainer = styled.div`
  display: flex;
  background-color: white;
  width: 100%;
  z-index: 1;
  position: sticky;
  top: -1px;
`

export const Tab = styled.div`
  padding: 1rem;
  /* Your tab styling here */
`

export const ItemListContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  padding-bottom: 3.75rem;
`

export const EachContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 1rem 1.25rem;
`

export const ContentTitle = styled.div`
  width: 100%;
  padding: 0.5rem 0;
  ${Pretendard({ size: 14, weight: Common.bold.regular, color: Common.colors.GR600 })}
`
export const Menu = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem 0;
  gap: 0.625rem;
  ${Pretendard({ size: 17, weight: Common.bold.regular, color: Common.colors.BK })}
`

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 0.75rem;
  padding-bottom: 0.875rem;
`
export const ItemCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #454381;
  border-radius: 0.75rem;
  width: 61%;
  height: 7.4375rem;
  padding: 1rem 1rem 0.625rem 1.125rem;
  ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.WH })}
`
export const CommunityCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #4dabf7;
  border-radius: 0.75rem;
  width: 35%;
  height: 7.4375rem;
  padding: 1rem 1rem 0.625rem 1.125rem;
  ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.WH })}
`
export const BottomInfo = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  .right {
    position: absolute;
    right: 0;
  }
`
export const PreviewWrapper = styled.div`
  display: flex;
  position: relative;
  .second {
    position: absolute;
    left: 1.2rem;
  }
`

export const ItemPreviewImg = styled.div<{ imgUrl?: string }>`
  width: 2rem;
  height: 2rem;
  box-sizing: content-box;
  border: 2px solid #454381;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  background-image: url(${(props) => props.imgUrl});
`
export const Count = styled.span`
  ${Pretendard({ size: 24, weight: Common.bold.regular, color: Common.colors.WH })}
  padding-bottom: 0.125rem;
`
