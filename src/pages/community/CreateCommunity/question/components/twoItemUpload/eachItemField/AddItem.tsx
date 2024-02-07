import React from 'react'
import { ReactComponent as Add } from '../../../../../../../assets/add_18.svg'

import styled from '@emotion/styled'
import { Common, Pretendard } from '../../../../../../../components/styles'

interface UploadPhotoProps {
  className?: string
  onClick: any
}

const AddItem = ({ className, onClick }: UploadPhotoProps) => {
  // 사진/아이템 추가 버튼
  return (
    <DefaultImageField className={className} onClick={() => onClick()}>
      <FieldWrapper>
        <Add></Add>
        <span>(0/1)</span>
      </FieldWrapper>
    </DefaultImageField>
  )
}

const DefaultImageField = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  background-color: ${Common.colors.GR200};
  span {
    ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.GR500 })};
  }
`

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

export default AddItem
