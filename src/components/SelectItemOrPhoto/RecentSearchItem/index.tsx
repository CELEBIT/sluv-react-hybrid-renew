import styled from '@emotion/styled'
import { Common, Pretendard } from '../../styles'
import Chip from '../../Chip/Chip'
import { useSetRecoilState } from 'recoil'

import { ChipWrapper } from '../../BottomSheetModal/ItemBrandSelectModal/ItemBrandSelectModal'
import useRecentSearchQuery from '../../../apis/search/hooks/useRecentSearchQuery'
import { itemNameSearchState } from '../SearchResult'
import { finalSearchState } from '..'

const RecentSearchItem = () => {
  const {
    getRecentSearch: { data },
    deleteRecentSearch: { mutate: mutateByDeleteRecentSearch },
    deleteAllRecentSearch: { mutate: mutateByDeleteAllRecentSearch },
  } = useRecentSearchQuery()
  const setSearchKeyword = useSetRecoilState(itemNameSearchState)
  const setFinalValue = useSetRecoilState<string>(finalSearchState)

  const onDeleteAllSearchLog = () => {
    mutateByDeleteAllRecentSearch()
  }
  const onDeleteEachSearchLog = (keyword: string) => {
    mutateByDeleteRecentSearch(keyword)
  }

  const onChipClick = (keyword: string) => {
    setSearchKeyword(keyword)
    setFinalValue(keyword)
  }

  return (
    <RecentSearchWrapper>
      <SearchLogWrapper>
        <span>최근 검색어</span>
        <DeleteAllText onClick={onDeleteAllSearchLog}>전체삭제</DeleteAllText>
      </SearchLogWrapper>
      <ChipWrapper>
        {(data?.length ?? 0) > 0 &&
          data?.map((search) => {
            return (
              <Chip
                key={search.keyword}
                text={search.keyword}
                onClick={() => onChipClick(search.keyword)}
                canDelete={true}
                onDelete={() => onDeleteEachSearchLog(search.keyword)}
              ></Chip>
            )
          })}
      </ChipWrapper>
    </RecentSearchWrapper>
  )
}

export default RecentSearchItem

export const RecentSearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: scroll;
  width: 100%;
  margin-top: 0.5rem;
  span {
    ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.GR600 })}
  }
  ::-webkit-scrollbar {
    display: none;
  }
`
const SearchLogWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 9px 1.25rem 0.5625rem 1.25rem;
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
