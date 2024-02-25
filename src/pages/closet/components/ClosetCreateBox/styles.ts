import styled from '@emotion/styled'
import { CoverBoxHeader, RootContainer } from '../ClosetCoverBox/styles'

import { ClosetBoxService } from '../../services'
import { getClosetBoxBackground } from '../../utils'

export const Root = RootContainer

export const CreateBoxHeader = CoverBoxHeader

export const CreateBoxLayout = styled.div<{ closetBox: ClosetBoxService }>`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  border-radius: 26px;
  box-sizing: border-box;
  padding: 10px 10px 8px;
  border: 1px solid #eaecef;
  ${({ closetBox }) => getClosetBoxBackground(closetBox, 'background')};
`

export const CreateBoxContent = styled.div<{ closetBox: ClosetBoxService }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 180px;
  width: 100%;
  gap: 10px;
`
export const CreateBoxTitleWrapper = styled.p`
  font-size: 15px;
  color: #aeb5bc;
  padding: 0;
  margin: 0;
`
