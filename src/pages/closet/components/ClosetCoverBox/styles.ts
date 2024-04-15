import styled from '@emotion/styled'
import { ClosetBoxService } from '../../services'
import { getClosetBoxBackground } from '../../utils'

export const RootContainer = styled.div`
  min-width: 20.9375rem;
  height: 11.25rem;
  width: 100%;
  box-sizing: border-box;
  border-radius: 1.625rem;
`

export const Layout = styled.div<{ closetBox: ClosetBoxService }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0.625rem 0.625rem 0.5rem;
  border-radius: 1.625rem;
  box-sizing: border-box;
  cursor: pointer;

  border: 1px solid #eaecef;
  ${({ closetBox }) => getClosetBoxBackground(closetBox, 'background')};
`

export const CoverBoxHeader = styled.div`
  width: 100%;
  height: 3.25rem;
`

export const CoverBoxBody = styled.div<{ service: ClosetBoxService }>`
  height: 100%;
  min-height: 5.25rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* ${({ service }) => getClosetBoxBackground(service, 'background')} */
`

export const CoverBoxFooter = styled.div`
  height: 1.625rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #ffffff;
  font-family: 'Pretendard';
`
