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
  width: 20.9375rem;
  padding: 0 1.25rem;
  span {
    width: 100%;
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
    border: 5px solid red;
  }
`

export const DisplayFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

export const SingleField = styled.div<FieldProps>`
  display: flex;
  flex-direction: row;
  text-overflow: ellipsis;
  align-items: center;
  background-color: ${({ disabled }) => (disabled ? Common.colors.GR100 : 'white')};
  height: 3.5rem;
  width: 20.9375rem;
  border: 1px solid ${Common.colors.GR200};
  border-radius: 0.5rem;
  padding: 0 1.25rem;
  span {
    ${Pretendard({ size: 17, weight: Common.bold.thin, color: Common.colors.GR600 })}
  }
`

export const FirstField = styled(Field)<FieldProps>`
  border-radius: 8px 8px 0 0;
  border-top: 1px solid ${Common.colors.GR200};
  border-left: 1px solid ${Common.colors.GR200};
  border-right: 1px solid ${Common.colors.GR200};
`

export const MiddleField = styled(Field)<FieldProps>`
  border-top: 1px solid ${Common.colors.GR200};
  border-left: 1px solid ${Common.colors.GR200};
  border-right: 1px solid ${Common.colors.GR200};
`

export const LastField = styled(Field)<FieldProps>`
  border: 1px solid ${Common.colors.GR200};
  border-radius: 0 0 8px 8px;
`
