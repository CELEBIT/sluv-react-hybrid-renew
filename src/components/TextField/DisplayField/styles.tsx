import styled from '@emotion/styled'
import { Common, Pretendard } from '../../styles'
import { css } from '@emotion/react'

interface FieldProps {
  disabled?: boolean
}

const Field = styled.div<FieldProps>`
  display: flex;
  flex-direction: row;
  text-overflow: ellipsis;
  align-items: center;
  background-color: ${({ disabled }) => (disabled ? Common.colors.GR100 : 'white')};
  height: 3.5rem;
  width: 100%;
  padding: 0 1.25rem;
  span {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    ${({ disabled }) =>
      disabled
        ? css`
            ${Pretendard({ size: 17, weight: Common.bold.thin, color: Common.colors.GR600 })}
          `
        : css`
            ${Pretendard({ size: 17, weight: Common.bold.thin, color: Common.colors.BK })}
          `};
  }
  img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    /* background-image: url(); */
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
`

export const DisplayFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  /* padding: 0 1.25rem; */
  &:focus-within > * {
    border-color: ${Common.colors.BK};
  }
`

export const SingleField = styled(Field)<FieldProps>`
  border: 0.0625rem solid ${Common.colors.GR200};
  border-radius: 0.5rem;
  padding: 0 1.25rem;
`

export const FirstField = styled(Field)<FieldProps>`
  border-radius: 0.5rem 0.5rem 0 0;
  border-top: 0.0625rem solid ${Common.colors.GR200};
  border-left: 0.0625rem solid ${Common.colors.GR200};
  border-right: 0.0625rem solid ${Common.colors.GR200};
`

export const MiddleField = styled(Field)<FieldProps>`
  border-top: 0.0625rem solid ${Common.colors.GR200};
  border-left: 0.0625rem solid ${Common.colors.GR200};
  border-right: 0.0625rem solid ${Common.colors.GR200};
`

export const LastField = styled(Field)<FieldProps>`
  border: 0.0625rem solid ${Common.colors.GR200};
  border-radius: 0 0 0.5rem 0.5rem;
`
