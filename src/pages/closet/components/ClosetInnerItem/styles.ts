import styled from '@emotion/styled'

export const Root = styled.div`
  min-width: 105px;
  min-height: 170px;
  width: 100%;
  height: 100%;
  max-height: 187px;
`

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`

export const ImageContainer = styled.div`
  width: 105px;
  height: 105px;
  position: relative;
  border-radius: 8px;
  & > img {
    object-fit: cover;
    border-radius: 8px;
    opacity: 3%;
    width: 100%;
    height: 100%;
  }
`

export const CheckBoxContainer = styled.div`
  position: absolute;
  top: 6px;
  right: 6px;
`

export const DescContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 6px;
  font-family: Pretendard;
  & > h4 {
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    letter-spacing: 0px;
    color: #212529;
    text-overflow: ellipsis;
  }

  & > h5 {
    font-size: 13px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0px;
    color: #7b8894;
    text-overflow: ellipsis;
  }
`
