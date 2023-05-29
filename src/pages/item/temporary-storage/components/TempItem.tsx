import React, { useEffect, useMemo, useState } from 'react'
import { TempItemResult } from '../../../../apis/item/itemService'
import styled from '@emotion/styled'
import { Img } from '../../../../components/AddPhotos/Photo'
import { Label } from '../../create/styles'
import { Common, Pretendard } from '../../../../components/styles'
import { ReactComponent as Check } from '../../../../assets/check_24.svg'
import { formatUpdatedAt } from '../../../../utils/utility'
import { filterRepresentImg, processTempTitle } from './TempItem.util'
import { useRecoilState } from 'recoil'
import { checkListState } from '..'

interface TempItemProps {
  data: TempItemResult
  isFirst: boolean
  isEditMode: boolean
}

const TempItem = ({ data, isFirst, isEditMode }: TempItemProps) => {
  const [isChecked, setIsChecked] = useState(false)
  const [checkedList, setCheckedList] = useRecoilState(checkListState)

  const [title, imgUrl] = useMemo(() => {
    const processedTitle = String(processTempTitle(data))
    if (data.imgList.length < 1) {
      return [processedTitle, '']
    } else {
      return [processedTitle, filterRepresentImg(data.imgList)]
    }
  }, [data])

  const isGray = useMemo(() => {
    if (isChecked || isFirst) {
      return true
    }
    return false
  }, [isChecked, isFirst])

  const onCheck = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (isChecked) {
      const filteredList = checkedList.filter((item) => item !== Number(target.value))
      setCheckedList([...filteredList])
    } else {
      setCheckedList((prev) => [...prev, Number(target.value)])
    }
    setIsChecked((prev) => !prev)
  }

  return (
    <TempItemWrap htmlFor={String(data.id)} isGray={isGray} isFirst={isFirst}>
      <div className='container'>
        {isEditMode && !isFirst && (
          <Checkbox>
            <input
              id={String(data.id)}
              type='checkbox'
              checked={isChecked}
              onChange={(e) => onCheck(e)}
              value={data.id}
            />
            <Check stroke={isChecked ? Common.colors.SEC : Common.colors.GR500} />
          </Checkbox>
        )}
        <div className='content'>
          <Label>{title}</Label>
          <span className='time'>
            {isFirst ? '현재 작성 중인 게시글' : formatUpdatedAt(data.updatedAt)}
          </span>
        </div>
      </div>
      {data.imgList.length > 0 && <Img size={48} borderRadius={8} imgUrl={imgUrl} />}
    </TempItemWrap>
  )
}

export default TempItem

const TempItemWrap = styled.label<{ isGray: boolean; isFirst: boolean }>`
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ isGray }) => (isGray ? Common.colors.GR100 : '#fff')};
  border-bottom: 1px solid ${Common.colors.GR200};

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
    color: ${({ isFirst }) => (isFirst ? Common.colors.SEC : Common.colors.GR500)};
  }
`

const Checkbox = styled.div`
  input[type='checkbox'] {
    -webkit-appearance: none;
    display: none;
  }
  margin-right: 1.0625rem;
`
