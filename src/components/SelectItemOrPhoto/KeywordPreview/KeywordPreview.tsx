import styled from '@emotion/styled'
import HighlightedText from '../../../components/HighlightedText/HighlightedText'
import { Common, Pretendard } from '../../../components/styles'
import useSearchQuery from '../../../apis/search/hooks/useSearchQuery'
import EmptyState from '../../EmptyState'
import { Divider } from '../../../pages/item/detail/styles'
import HotItem from '../HotItem'
import { useSetRecoilState } from 'recoil'
import { itemNameSearchState } from '../SearchResult'
import { finalSearchState } from '..'
import { useNavigate } from 'react-router-dom'

interface KeywordPreviewProps {
  keyword: string
}

const KeywordPreview = ({ keyword }: KeywordPreviewProps) => {
  const navigate = useNavigate()
  const { searchAllData } = useSearchQuery()
  const { data } = searchAllData(keyword)
  console.log(data)
  const setSearchValue = useSetRecoilState<string>(itemNameSearchState)
  const setFinalValue = useSetRecoilState<string>(finalSearchState)

  const onClickPreviewKeyword = (keyword: string) => {
    setSearchValue(keyword)
    setFinalValue(keyword)
  }

  return (
    <KeywordPreviewWrap>
      {data &&
      (data?.brandList?.length > 0 || data?.celebList?.length > 0 || data?.itemList?.length > 0) ? (
        <>
          {data?.celebList &&
            data?.celebList.length > 0 &&
            data.celebList.map((item, idx) => {
              return (
                <KeywordItem key={idx} onClick={() => onClickPreviewKeyword(item.celebTotalNameKr)}>
                  <HighlightedText searchText={keyword} text={item.celebTotalNameKr} />
                </KeywordItem>
              )
            })}
          {data?.brandList &&
            data?.brandList.length > 0 &&
            data.brandList.map((item, idx) => {
              return (
                <KeywordItem key={idx} onClick={() => onClickPreviewKeyword(item.brandKr)}>
                  <HighlightedText searchText={keyword} text={item.brandKr} />
                </KeywordItem>
              )
            })}{' '}
          {data?.itemList &&
            data?.itemList.length > 0 &&
            data.itemList.map((item, idx) => {
              return (
                <KeywordItem key={idx} onClick={() => onClickPreviewKeyword(item.itemName)}>
                  <HighlightedText searchText={keyword} text={item.itemName} />
                </KeywordItem>
              )
            })}
        </>
      ) : (
        <div className='full'>
          <EmptyState
            icon='search'
            title='검색 결과가 없어요'
            subtitle='다른 키워드로 검색해 주시거나
철자와 띄어쓰기를 확인해 주세요'
          ></EmptyState>
          <Divider className='full'></Divider>
          <HotItem></HotItem>
        </div>
      )}
    </KeywordPreviewWrap>
  )
}

export default KeywordPreview

const KeywordPreviewWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100vw;
  padding-top: 1rem;
  padding: 1rem 1.25rem 1.25rem 1.25rem;
  .full {
    width: 100vw;
    margin-left: calc(-50vw + 50%);
  }
`
const KeywordItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  ${Pretendard({
    size: 18,
    weight: Common.bold.regular,
    color: Common.colors.BK,
  })}
`
