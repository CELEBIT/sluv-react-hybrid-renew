import React, { useMemo, useState } from 'react'
import { TempItemResult } from '../../../../apis/item/itemService'
import styled from '@emotion/styled'
import { Img } from '../../../../components/AddPhotos/Photo'
import { Label } from '../../create/styles'
import { Common, Pretendard } from '../../../../components/styles'
import { ReactComponent as Check } from '../../../../assets/check_24.svg'
import { processTempTitle } from '../../../../utils/utility'

interface TempItemProps {
  data: TempItemResult
  isFirst: boolean
  isEditMode: boolean
}

const TempItem = ({ data, isFirst, isEditMode }: TempItemProps) => {
  const [isChecked, setIsChecked] = useState(false)

  console.log(processTempTitle(data))

  const title = useMemo(() => {
    return String(processTempTitle(data))
  }, [data])

  return (
    <TempItemWrap>
      <div className='container'>
        {isEditMode && !isFirst && (
          <CheckboxLabel>
            <input type='checkbox' checked={isChecked} />
            <Check stroke={isChecked ? Common.colors.SEC : Common.colors.GR500} />
          </CheckboxLabel>
        )}
        <div className='content'>
          <Label>{title}</Label>
          <span className='time'>3초 전</span>
        </div>
      </div>
      <Img
        size={48}
        borderRadius={8}
        imgUrl={
          'https://newsimg-hams.hankookilbo.com/2022/08/03/8e83bb3f-9e4a-4977-bda5-f08320bf0dbe.jpg'
        }
      />
    </TempItemWrap>
  )
}

export default TempItem

const TempItemWrap = styled.div`
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .container {
    display: flex;
    align-items: center;
  }
  .content {
    display: flex;
    flex-direction: column;
  }
  .time {
    margin-top: 0.5rem;
    ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.GR500 })}
  }
`

const CheckboxLabel = styled.label`
  input[type='checkbox'] {
    -webkit-appearance: none;
    display: none;
  }
  margin-right: 1.0625rem;
`
