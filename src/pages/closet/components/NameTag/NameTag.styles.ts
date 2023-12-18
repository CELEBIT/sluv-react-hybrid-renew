import styled from '@emotion/styled'
import { CoverBoxColorKey, DEFAULT_COVER_COLOR_SET } from '../../utils/consts'
import { ReactComponent as OriginSideDotsIcon } from '../../../../assets/add_24.svg'
import { ReactComponent as OriginLockIcon } from '../../../../assets/lock_24.svg'
export const RootContainer = styled.div`
  width: 100%;
  height: 52px;
`

export const Layout = styled.div<{ colorScheme: CoverBoxColorKey }>`
  display: flex;
  border-radius: 100px;
  padding: 14px 20px 14px 20px;
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
export const SideDotsIcon = styled(OriginSideDotsIcon)<{ editMode?: boolean }>`
  stroke: ${({ editMode }) => (editMode ? '#ffffff66' : '#ffffff')};
`

export const LockIcon = styled(OriginLockIcon)<{ editMode?: boolean }>`
  stroke: ${({ editMode }) => (editMode ? '#ffffff66' : '#ffffff')};
  fill: ${({ editMode }) => (editMode ? '#ffffff66' : '#ffffff')};
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

export const ChipRoot = styled.div`
  position: relative;
  height: 35px;
  left: 5%;
  top: 70%;
  width: 40%;
`

export const ChipLayout = styled.div<{ colorScheme: CoverBoxColorKey }>`
  display: flex;
  border-radius: 54px;
  padding: 6px 12px 6px 16px;
  gap: 5px;
  justify-content: center;
  align-items: center;
  background: ${({ colorScheme }) => DEFAULT_COVER_COLOR_SET[colorScheme].nameTag?.background};
`
