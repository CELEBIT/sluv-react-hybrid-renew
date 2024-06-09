import styled from '@emotion/styled'
import { Common, Pretendard } from '../../components/styles'

export const SelectCelebContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  padding-left: 0;
  background-color: white;

  ::-webkit-scrollbar {
    display: none;
  }
`

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`

export const TitleSearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1.25rem 0 1.25rem;
  justify-content: space-between;
  gap: 1.25rem;
  ${Pretendard({
    size: 24,
    weight: Common.bold.semiBold,
    color: Common.colors.BK,
  })};
`

export const SearchWrapper = styled.div`
  display: flex;
`

export const CelebCategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem 0 1.25rem 0;
`
export const CategoryContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 3.4375rem 0 1.25rem;
  width: 100%;
  height: 100%;
`
export const CategoryTitle = styled.span`
  padding: 0 0.25rem 1rem 0.25rem;
  ${Pretendard({
    size: 15,
    weight: Common.bold.regular,
    color: Common.colors.BK,
  })};
`

export const SideBarWrapper = styled.div<{ size: string }>`
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 0;
  top: 13.375rem;
  justify-content: space-around;
  gap: 1.5rem;
  transition: 0.3s ease-in-out;
  background-color: white;
  padding: 1.1875rem 1rem 1.1875rem 0.75rem;
  border-radius: 1.25rem 0 0 1.25rem;
  box-shadow: -2px 2px 24px 0px #c7ced480;
  z-index: 100;
  .tooltip {
    display: flex;
    position: absolute;
    right: 2.5rem;
  }
`

export const SmallSideBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  position: fixed;
  right: 0;
  top: 13.375rem;
  width: 1.9375rem;
  height: 7.6875rem;
  border-radius: 1.25rem 0 0 1.25rem;
  gap: 0.875rem;
  justify-content: center;
  align-items: center;
  box-shadow: -2px 2px 24px 0px #c7ced480;
`

export const SidebarDot = styled.div<{ color: string }>`
  display: inline-flex;
  width: 0.4375rem;
  height: 0.4375rem;
  background-color: ${(props) => props.color};
  border-radius: 50%;
`

export const SidebarRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  align-items: center;
  gap: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  ${Pretendard({
    size: 15,
    weight: Common.bold.regular,
    color: Common.colors.BK,
  })};
`

export const CelebListWrapper = styled.div<{ open?: boolean }>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* flex-shrink: 0; */
  gap: 1rem 0.75rem;
  width: 100%;
  overflow: hidden;
  transition: 0.2s ease-in;
  max-height: ${(props) => (props.open ? '100%' : '14.5rem')};
`
export const ShowMoreWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.375rem 3.4375rem 0.375rem 1.25rem;
  width: 100%;
  border-bottom: 1px solid ${Common.colors.GR100};
`
export const ListButtonWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 0.75rem;
  background-color: ${Common.colors.GR200};
`
export const Dimmer = styled.div`
  position: absolute;
  bottom: 5rem;
  /* border: 1px solid red; */
  height: 1.25rem;
  width: 100%;
  background: linear-gradient(180deg, transparent, #ffffff 100%);
`
export const SearchResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`
