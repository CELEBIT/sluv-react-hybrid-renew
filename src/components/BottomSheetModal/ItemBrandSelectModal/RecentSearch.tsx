import styled from '@emotion/styled'
import React from 'react'
import { Common, Pretendard } from '../../styles'
import Chip from '../../Chip/Chip'
import { ChipWrapper } from '../ItemBrandSelectModal'
import { selectedBrandState } from '../../../pages/item/create/component/BrandItemField/BrandItemField'
import { useSetRecoilState } from 'recoil'
import useModals from '../../Modals/hooks/useModals'
import { modals } from '../../Modals'

const RecentSearch = () => {
  const chipList = [
    {
      id: 0,
      brandKr: '무',
      brandEn: '무신사',
      brandImgUrl: 'string',
    },
    {
      id: 1,
      brandKr: '에잇세컨즈',
      brandEn: '에잇세컨즈',
      brandImgUrl: 'string',
    },
    {
      id: 2,
      brandKr: '플랙',
      brandEn: '플랙',
      brandImgUrl: 'string',
    },
    {
      id: 3,
      brandKr: '루이비통',
      brandEn: '루이비통',
      brandImgUrl: 'string',
    },
    {
      id: 4,
      brandKr: '샤넬',
      brandEn: '샤넬',
      brandImgUrl: 'string',
    },
    {
      id: 5,
      brandKr: '프로젝트엠',
      brandEn: '프로젝트엠',
      brandImgUrl: 'string',
    },
    {
      id: 6,
      brandKr: '나이키',
      brandEn: '나이키',
      brandImgUrl: 'string',
    },
    {
      id: 7,
      brandKr: '아디다스',
      brandEn: '아디다스',
      brandImgUrl: 'string',
    },
    {
      id: 8,
      brandKr: '뉴발란스',
      brandEn: '뉴발란스',
      brandImgUrl: 'string',
    },
  ]
  const setBrand = useSetRecoilState(selectedBrandState)
  const onDeleteAllSearchLog = () => {
    alert('각각 검색어 삭제')
  }
  const onDeleteEachSearchLog = () => {
    alert('각각 검색어 삭제')
  }

  const { closeModal } = useModals()

  const onChipClick = (chipText: string) => {
    setBrand(chipText)
    closeModal(modals.ItemBrandSelectModal)
  }

  return (
    <RecentSearchWrapper>
      <SearchLogWrapper>
        <span>최근 검색한 브랜드</span>
        <DeleteAllText onClick={onDeleteAllSearchLog}>전체삭제</DeleteAllText>
      </SearchLogWrapper>
      <ChipWrapper>
        {chipList.map((chip) => {
          return (
            <Chip
              key={chip.id}
              text={chip.brandKr}
              onClick={() => onChipClick(chip.brandKr)}
              canDelete={true}
              onDelete={onDeleteEachSearchLog}
            ></Chip>
          )
        })}
      </ChipWrapper>
    </RecentSearchWrapper>
  )
}

export default RecentSearch

const RecentSearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: scroll;
  width: 100%;
  margin-top: 1.5rem;
  span {
    ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.GR600 })}
    margin: 0.5625rem 0 0.5625rem 1.25rem;
  }
`
const SearchLogWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5625rem 20px 0.5625rem 0;
  width: 100%;
  span {
    ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.GR600 })}
    margin: 0.5625rem 0 0.5625rem 1.25rem;
  }
`
const DeleteAllText = styled.span`
  font-family: Pretendard;
  font-size: 0.9375rem;
  font-weight: 500;
  color: ${Common.colors.GR500} !important;
`
