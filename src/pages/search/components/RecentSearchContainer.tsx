import styled from '@emotion/styled'
import React from 'react'
import { Common, Pretendard } from '../../../components/styles'
import { ChipWrapper } from '../../../components/BottomSheetModal/ItemBrandSelectModal/ItemBrandSelectModal'
import { IRecentSearch } from '../../../apis/search/searchService'
import Chip from '../../../components/Chip/Chip'

interface RecentSearchContainerProps {
  dataList?: Array<IRecentSearch>
}

const RecentSearchContainer = ({ dataList }: RecentSearchContainerProps) => {
  const onDeleteAllSearchLog = () => {
    alert('전체삭제')
  }
  const onDeleteEachSearchLog = (item: IRecentSearch) => {
    alert('전체삭제')
  }
  const onChipClick = (item: IRecentSearch) => {
    alert('전체삭제')
  }

  return (
    <RecentSearchWrap>
      <SearchLogWrapper>
        <span>최근 검색어</span>
        <DeleteAllText onClick={onDeleteAllSearchLog}>전체삭제</DeleteAllText>
      </SearchLogWrapper>
      <ChipWrapper>
        {(dataList?.length ?? 0) > 0 &&
          dataList?.map((item, idx) => {
            return (
              <Chip
                key={idx}
                text={item.keyword}
                onClick={() => onChipClick(item)}
                canDelete={true}
                onDelete={() => onDeleteEachSearchLog(item)}
              ></Chip>
            )
          })}
      </ChipWrapper>
    </RecentSearchWrap>
  )
}

export default RecentSearchContainer

const RecentSearchWrap = styled.div`
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
  color: ${Common.colors.GR500} !important;
`
