import React, { useEffect, useMemo, useState } from 'react'
import styled from '@emotion/styled'
import { Img } from '../../../../components/AddPhotos/Photo'
import { Label } from '../../create/styles'
import { Common, Pretendard } from '../../../../components/styles'
import { ReactComponent as Check } from '../../../../assets/check_24.svg'
import { formatUpdatedAt } from '../../../../utils/utility'
import { filterRepresentImg, processTempTitle } from './TempItem.util'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { checkListState } from '..'
import { TempItemResult } from '../../../../apis/item/itemService.type'
import { useNavigate } from 'react-router-dom'
import { localStorageKeys } from '../../../../config/localStorageKeys'
import { IHashTag, celebInfoInItemState, itemInfoState } from '../../../../recoil/itemInfo'
import { imgListState } from '../../../../components/AddPhotos/AddPhotos'
import {
  parentCategoryState,
  subCategoryState,
} from '../../../../components/BottomSheetModal/ItemCategoryModal'
import { hashTagState } from '../../addInfo/components/HashTags/HashTag'

interface TempItemProps {
  data: TempItemResult
  isFirst: boolean
  isEditMode: boolean
}

const TempItem = ({ data, isFirst, isEditMode }: TempItemProps) => {
  const navigate = useNavigate()

  const [isChecked, setIsChecked] = useState(false)
  const [checkedList, setCheckedList] = useRecoilState(checkListState)
  const [itemInfo, setItemInfo] = useRecoilState(itemInfoState)
  const setCelebInfoInItem = useSetRecoilState(celebInfoInItemState)
  const setImgListState = useSetRecoilState(imgListState)
  const setSubCategory = useSetRecoilState(subCategoryState)
  const setParentCategory = useSetRecoilState(parentCategoryState)
  const setHashTags = useSetRecoilState(hashTagState)

  const [title, imgUrl] = useMemo(() => {
    const processedTitle = String(processTempTitle(data))
    if (data.imgList === null) {
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
  const onClickTempItem = () => {
    if (isEditMode) {
      return
    }
    localStorage.setItem(localStorageKeys.TEMP_ITEM_ID, String(data.id))

    const hashtags: Array<IHashTag> = []
    data.hashTagList &&
      data.hashTagList.map((item) => {
        hashtags.push({
          hashtagId: item.hashtagId,
          hashtagContent: item.hashtagContent,
        })
      })
    setHashTags(hashtags)

    // 사진 설정
    setImgListState(data.imgList ?? [])
    if (data.category) {
      if (data.category.parentId && data.category.parentName) {
        setParentCategory({ id: data.category.parentId, name: data.category.parentName })
      }
      if (data.category.id && data.category.name) {
        setSubCategory({ id: data.category.id, name: data.category.name })
      }
    }
    // 셀럽 설정
    if (data.celeb) {
      setCelebInfoInItem((prevState) => ({
        ...prevState,
        groupId: data.celeb.parentId !== null ? data.celeb.parentId : null,
        groupName: data.celeb.parentCelebNameKr !== null ? data.celeb.parentCelebNameKr : null,
        soloId: data.celeb.id !== null ? data.celeb.id : null,
        soloName: data.celeb.celebNameKr !== null ? data.celeb.celebNameKr : null,
      }))
    }

    setItemInfo({
      ...itemInfo,
      imgList: data.imgList ?? null,
      celeb: data.celeb && {
        celebId: data.celeb.id,
        celebName: data.celeb.celebNameKr,
      },
      whenDiscovery: data.whenDiscovery ? new Date(data.whenDiscovery) : null,
      whereDiscovery: data.whereDiscovery,
      itemCategory: data.category && {
        categoryId: data.category.id,
        childName: data.category.name,
        parentCategoryId: data.category.parentId,
        parentName: data.category.parentName,
      },
      brand: data.brand && {
        brandId: data.brand.id,
        brandName: data.brand.brandKr,
        brandImgUrl: data.brand.brandImgUrl,
      },
      itemName: data.itemName,
      price: data.price,
      additionalInfo: data.additionalInfo,
      hashTagList: !hashtags ? null : hashtags,
      linkList: !data.linkList ? null : data.linkList,
      infoSource: data.infoSource,
      newCeleb: data.newCeleb && {
        celebId: data.newCeleb.newCelebId,
        celebName: data.newCeleb.newCelebName,
      },
      newBrand: data.newBrand && {
        brandId: data.newBrand.newBrandId,
        brandName: data.newBrand.newBrandName,
      },
    })

    navigate(-1)
  }

  return (
    <TempItemWrap
      onClick={onClickTempItem}
      htmlFor={String(data.id)}
      isGray={isGray}
      isFirst={isFirst}
    >
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
      {data.imgList && data.imgList.length > 0 && (
        <Img size={48} borderRadius={8} imgUrl={imgUrl} />
      )}
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
