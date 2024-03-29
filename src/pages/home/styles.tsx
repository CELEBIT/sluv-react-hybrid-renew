import styled from '@emotion/styled'
import { Common, Pretendard } from '../../components/styles'

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: -1.25rem;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  padding-left: 0;
  ::-webkit-scrollbar {
    display: none;
  }
  background-color: white;
  padding-bottom: 55px;
`
export const ComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
`

export const ScrollComponentWrapper = styled.div<{ bgColor?: string }>`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 1rem;
  padding: 48px 0;
  background-color: ${(props) => props.bgColor == 'gray' && Common.colors.GR100};
  width: 100%;
  ::-webkit-scrollbar {
    display: none;
  }

  .title {
    padding-left: 1.25rem;
  }
  .shortTop {
    margin-top: -1.875rem;
  }
`

export const HomeTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;
  gap: 0.375rem;
`

export const HomeTitle = styled.span`
  ${Pretendard({ size: 21.5, weight: Common.bold.semiBold, color: Common.colors.BK })}
`

export const HotCelebTitle = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  ${Pretendard({ size: 32, weight: Common.bold.semiBold, color: Common.colors.BK })}
`
