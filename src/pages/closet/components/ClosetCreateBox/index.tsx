import React, {
  createRef,
  HTMLAttributes,
  PropsWithChildren,
  ReactElement,
  useContext,
} from 'react'

import * as S from '../ClosetCreateBox/styles'

import { CreateClosetFormContext } from '../../create'
import { useLocation, useNavigate } from 'react-router-dom'
import NameTag from '../NameTag'
import { CoverBoxColorKey, DEFAULT_COVER_COLOR_SET } from '../../utils/consts'
import { CoverImageMode } from '../../../../apis/closet/model'
import ClosetBoxGrabIcon from '../GrabIcon'

export type ClosetCreateBoxProps = {
  onForwardingCreate?: (...args: any) => void
}

const ClosetCreateBox = ({ onForwardingCreate }: ClosetCreateBoxProps) => {
  const context = useContext(CreateClosetFormContext)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const ref = createRef<HTMLInputElement>()

  const isOnCreatePage = pathname === '/closet/create' || pathname === '/closet/edit'

  if (!context) return <></>

  const handleClick = () => {
    if (!isOnCreatePage) {
      navigate('/closet/create')
      return
    }
    onForwardingCreate?.()
    context.handlers.setName(ref.current?.value || '')
  }

  return (
    <S.Root onClick={handleClick}>
      <ClosetCreateBoxContent>
        {isOnCreatePage && (
          <S.CreateBoxHeader>
            <NameTag
              service={{
                closetBox: context.states,
                onSave: (name) => {
                  context?.handlers.setName(name)
                },
                editMode: true,
              }}
              ref={ref}
            />
          </S.CreateBoxHeader>
        )}
      </ClosetCreateBoxContent>
    </S.Root>
  )
}

// 순전히 ui logic 만 담겨야 한다.
// img -> default -> none 우선순위를 가진다.
// img : 이미지, default: 색상 커버, none : 배경 없음 및 텍스트 출력

type ClosetCreateBoxContentProps = PropsWithChildren<object>

export const ClosetCreateBoxContent = ({ children }: ClosetCreateBoxContentProps) => {
  const context = useContext(CreateClosetFormContext)
  const { pathname } = useLocation()
  const isOnCreatePage = pathname === '/closet/create' || pathname === '/closet/edit'

  if (!context) return <></>

  const coverBoxColor = context.states.colorScheme
  if (context.states.coverImgUrl === 'null') {
    context.states.coverImageMode = 'NONE'
  }
  const coverImageMode = context.states.coverImageMode as CoverImageMode

  const showCreateBoxContentText = coverImageMode === 'NONE'
  const coverBoxText =
    coverImageMode === 'NONE' && isOnCreatePage
      ? '옷장 커버 사진을 올려주세요'
      : '나만의 옷장을 만들어 보아요'

  return (
    <S.CreateBoxLayout closetBox={context.states}>
      {children}
      <S.CreateBoxContent closetBox={context.states}>
        <>
          {coverImageMode !== 'IMAGE' && (
            <ClosetBoxGrabIcon coverBoxColor={coverBoxColor} coverImageMode={coverImageMode} />
          )}
          {showCreateBoxContentText && (
            <S.CreateBoxTitleWrapper>{coverBoxText}</S.CreateBoxTitleWrapper>
          )}
        </>
      </S.CreateBoxContent>
    </S.CreateBoxLayout>
  )
}

export default ClosetCreateBox
