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
  max-height: 187px;
 
`

export const ImageContainer = styled.div`
  width: 105px;
  height: 105px;
  position: relative;
  border-radius: 8px;
  & > img {
    object-fit: cover;
    border-radius: 8px;
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
  max-height: 75px;
  width:100%;
  text-align: start;
  & > h4 {
    margin: 0;
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    max-height: 17px;
    color: #212529;
    overflow-x: clip;
    text-overflow: ellipsis;
    text-align: start;
    width: 100%;
    white-space: nowrap;
  }

  & > h5 {
    margin: 0;
    width: 100%;
    max-height: 16px;
    font-size: 13px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0px;
    color: #7b8894;
    text-align: start;
    white-space: nowrap;
    overflow-x: clip;
    text-overflow: ellipsis;
  }
`
