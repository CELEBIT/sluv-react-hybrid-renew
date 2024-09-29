import styled from '@emotion/styled'
import React from 'react'
import { Common, Pretendard } from '../../styles'
import { ChipWrapper } from './ItemBrandSelectModal'
import { RecentBrandResult } from '../../../apis/brand/brandService'
import RecentBrandChip from './RecentBrandChip'
import useRecentBrandQuery from '../../../apis/brand/hooks/useRecentBrandQuery'

interface RecentSelectBrandProps {
  data?: Array<RecentBrandResult>
}

const RecentSelectBrand = ({ data }: RecentSelectBrandProps) => {
  const {
    deleteAllRecentBrands: { mutate },
  } = useRecentBrandQuery()

  const onDeleteAllSearchLog = () => {
    mutate()
  }

  return (
    <RecentSearchWrapper>
      <SearchLogWrapper>
        <span>최근 선택한 브랜드</span>
        <DeleteAllText onClick={onDeleteAllSearchLog}>전체삭제</DeleteAllText>
      </SearchLogWrapper>
      <ChipWrapper>
        {(data?.length ?? 0) > 0 &&
          data?.map((brand) => {
            return <RecentBrandChip key={brand.id} brandData={brand} />
          })}
      </ChipWrapper>
    </RecentSearchWrapper>
  )
}

export default RecentSelectBrand

const RecentSearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: scroll;
  width: 100%;
  margin-top: 1.5rem;
  span {
    ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.GR600 })}
  }
`
const SearchLogWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5625rem 1.25rem 0.5625rem 1.25rem;
  width: 100%;
  span {
    ${Pretendard({
      size: 15,
      weight: Common.bold.regular,
      color: Common.colors.GR600,
    })}
  }
`
const DeleteAllText = styled.span`
  font-family: Pretendard;
  font-size: 0.9375rem;
  font-weight: 500;
  color: ${Common.colors.BK} !important;
`
