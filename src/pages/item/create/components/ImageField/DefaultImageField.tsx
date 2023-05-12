import React from 'react'
import styled from '@emotion/styled'
import { ReactComponent as Add } from '../../../../../assets/add_18.svg'
import { ReactComponent as Error } from '../../../../../assets/error_20.svg'
import { Pretendard, Common } from '../../../../../components/styles'

interface ImageFieldProps {
  error: boolean
}

const DefaultImageField = ({ error }: ImageFieldProps) => {
  const onClick = () => {
    alert('galary open')
  }
  return (
    <DefaultImageFieldWrapper error={error} onClick={onClick}>
      {error ? <Error></Error> : <Add></Add>}
      <span>착용 사진을 올려주세요 (0/5)</span>
    </DefaultImageFieldWrapper>
  )
}

export default DefaultImageField

const DefaultImageFieldWrapper = styled.div<{ error: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  margin: 1rem 1.25rem 0 1.25rem;
  height: 4.625rem;
  border: 1px solid ${Common.colors.GR200};
  border-radius: 0.5rem;
  ${Pretendard({
    size: 15,
    weight: Common.bold.regular,
    color: Common.colors.GR500,
  })}
  color: ${(props) => props.error && Common.colors.ERROR};
`
