import styled from '@emotion/styled'
import { CoverBoxColorKey, DEFAULT_COVER_COLOR_SET } from '../ClosetCoverBox/ClosetCoverBox.consts'
import { ReactComponent as OriginAddIcon } from '../../../../assets/add_24.svg'
import { ReactComponent as OriginLockIcon } from '../../../../assets/lock_24.svg'
export const RootContainer = styled.div`
  width: 100%;
  height: 52px;
`

export const Layout = styled.div<{ colorScheme: CoverBoxColorKey }>`
  display: flex;
  border-radius: 100px;
  padding: 14px 10px 14px 20px;
  gap: 10px;
  justify-content: center;
  align-items: center;
  background: ${({ colorScheme }) => DEFAULT_COVER_COLOR_SET[colorScheme].nameTag?.background};
`

export const TitleWrapper = styled.div`
  width: 100%;
  font-size: 18px;
  font-weight: 600;
  text-align: start;
  font-family: Pretendard;
  color: #ffffff;
`

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`
export const AddIcon = styled(OriginAddIcon)<{ editMode?: boolean }>`
  path {
    fill: ${({ editMode }) => (editMode ? '#ffffff66' : '#ffffff')};
  }
`

export const LockIcon = styled(OriginLockIcon)<{ editMode?: boolean }>`
  & > circle {
    fill: ${({ editMode }) => (editMode ? '#ffffff66' : '#ffffff')};
  }
`

export const NameTagEditInput = styled.input`
  font-size: 18px;
  font-family: Pretendard;
  font-weight: 600;
  background: transparent;
  border: none;

  &:focus,
  &:active {
    border: none;
    outline: none;
  }
  &::placeholder {
    color: #ffffff66;
  }
  color: #ffffff;
`
