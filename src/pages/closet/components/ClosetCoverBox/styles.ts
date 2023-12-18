import styled from '@emotion/styled'
import { ClosetBoxService } from '../../services'
import { getClosetBoxBackground } from '../../utils'

export const RootContainer = styled.div`
  min-width: 335px;
  height: 180px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 26px;
`

export const Layout = styled.div<{ closetBox: ClosetBoxService }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 10px 8px;
  border-radius: 26px;
  box-sizing: border-box;
  cursor: pointer;

  border: 1px solid #eaecef;
  ${({ closetBox }) => getClosetBoxBackground(closetBox, 'background')};
`

export const CoverBoxHeader = styled.div`
  width: 100%;
  height: 52px;
`

export const CoverBoxBody = styled.div<{ service: ClosetBoxService }>`
  height: 100%;
  min-height: 84px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ service }) => getClosetBoxBackground(service, 'background')}
`

export const CoverBoxFooter = styled.div`
  height: 26px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #ffffff;
  font-family: Pretendard;
`
