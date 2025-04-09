import styled from '@emotion/styled'
import { useSetRecoilState } from 'recoil'
import { finalSearchState } from '..'
import useSearchRankQuery from '../../../apis/search/hooks/useSearchRankQuery'
import { ChipWrapper } from '../../BottomSheetModal/ItemCelebModal/ItemCelebSearchModal'
import Chip from '../../Chip/Chip'
import { Common, Pretendard } from '../../styles'
import { itemNameSearchState } from '../SearchResult'
const HotSearchItem = () => {
  const setSearchValue = useSetRecoilState<string>(itemNameSearchState)
  const setFinalValue = useSetRecoilState<string>(finalSearchState)

  const {
    getSearchRank: { data },
  } = useSearchRankQuery()

  // const {
  //   postRecentCeleb: { mutate: mutateByPostRecentCeleb },
  // } = useRecentCelebQuery()

  const onChipClick = (keyword: string) => {
    setSearchValue(keyword)
    setFinalValue(keyword)
  }

  return (
    <HotWrapper>
      <span>인기 검색어</span>
      <ChipWrapper>
        {(data?.length ?? 0) > 0 &&
          data?.map((keyword) => {
            return (
              <Chip
                key={keyword.keyword}
                text={keyword.keyword}
                onClick={() => onChipClick(keyword.keyword)}
              />
            )
          })}
      </ChipWrapper>
    </HotWrapper>
  )
}

const HotWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: scroll;
  width: 100%;
  margin-top: 0.5rem;
  span {
    ${Pretendard({ size: 15, weight: Common.bold.regular, color: Common.colors.GR600 })}
    margin: 0.5625rem 0 0.5625rem 1.25rem;
  }
`

export default HotSearchItem
