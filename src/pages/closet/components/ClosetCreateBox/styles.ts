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
  border-radius: 1.625rem;
  box-sizing: border-box;
  padding: 0.625rem 0.625rem 0.5rem;
  border: 1px solid #eaecef;
  ${({ closetBox }) => getClosetBoxBackground(closetBox, 'background')};
`

export const CreateBoxContent = styled.div<{ closetBox: ClosetBoxService }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 11.25rem;
  width: 100%;
  gap: 0.625rem;
`
export const CreateBoxTitleWrapper = styled.p`
  font-size: 0.9375rem;
  color: #aeb5bc;
  padding: 0;
  margin: 0;
`
