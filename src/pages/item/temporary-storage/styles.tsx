import styled from '@emotion/styled'
import { Common, Pretendard } from '../../../components/styles'

export const TStoragePageStyle = styled.main`
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  height: 100%;
  overflow-y: scroll;
`

export const HeaderWrap = styled.div`
  padding: 0 1.25rem;
  font-size: 1.0625rem;
  font-weight: ${Common.bold.regular};
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
`

export const EditBtn = styled.button`
  outline: none;
  border: none;
  padding: 0;
  ${Pretendard({
    size: 18,
    weight: Common.bold.semiBold,
    color: Common.colors.BK,
  })};

  :disabled {
    color: ${Common.colors.GR500};
  }
`

export const SelectedCtnDiv = styled.div`
  ${Pretendard({
    size: 15,
    weight: Common.bold.regular,
    color: Common.colors.GR600,
  })};
  padding: 0.5625rem 0.25rem;

  span {
    color: ${Common.colors.BK};
  }
`

export const ListWrap = styled.div`
  margin-top: 4.9688rem;
`

export const DeleteFloatingContainer = styled.div`
  position: absolute;
  bottom: 24px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;

  .wrapper {
    background-color: black;
    border-radius: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & button {
      outline: none;
      border: none;
      background-color: transparent;
      ${Pretendard({
        size: 15,
        weight: Common.bold.regular,
        color: '#fff',
      })}
      padding: 0.75rem 1.5rem;
    }

    & span {
      width: 12px;
      height: 1px;
      background-color: #ffffff;
      transform: rotate(90deg);
    }
  }
`

export const Info = styled.div`
  ${Pretendard({
    size: 15,
    weight: Common.bold.regular,
    color: Common.colors.GR600,
  })}
  padding: 2.5rem;
  text-align: center;
`
