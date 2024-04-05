import styled from '@emotion/styled'
import { Common, Pretendard } from '../../components/styles'

export const SettingMenu = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 1.25rem 0.875rem 1.25rem;
  justify-content: center;

  .logout {
    padding: 0 0 0.125rem 0;
  }
`

export const MenuTitle = styled.span`
  padding: 0.5rem 0;
  ${Pretendard({ size: 14, weight: Common.bold.regular, color: Common.colors.GR600 })}
`

export const IdInfoRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem 0;
  gap: 0.5rem;
  ${Pretendard({ size: 17, weight: Common.bold.regular, color: Common.colors.BK })}
`

export const Menu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  ${Pretendard({ size: 17, weight: Common.bold.regular, color: Common.colors.BK })}

  .updateText {
    ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.SEC })}
  }
`

export const UpdateText = styled.span<{ canUpdate: boolean }>`
  ${(props) =>
    props.canUpdate
      ? Pretendard({ size: 14, weight: Common.bold.regular, color: Common.colors.SEC })
      : Pretendard({ size: 14, weight: Common.bold.regular, color: Common.colors.GR600 })}
`

export const DeleteAccount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${Pretendard({ size: 13, weight: Common.bold.thin, color: Common.colors.GR500 })}
  padding: 1rem 1.25rem;
  text-decoration: underline;
  margin-top: 3.75rem;
`
export const ContentParagraphWrap = styled.div`
  padding: 1.25rem;
  ${Pretendard({ size: 13, weight: Common.bold.regular, color: Common.colors.GR600 })}

  line-height: 1.4375rem;
  word-break: keep-all;

  .title {
    ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.BK })}
  }
`
export const MainText = styled.span`
  padding: 1.5rem 1.25rem 0 1.25rem;
  ${Pretendard({ size: 18, weight: Common.bold.regular, color: Common.colors.BK })}
`
