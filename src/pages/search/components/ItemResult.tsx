import React from 'react'
import ItemListGrid from '../../../components/ItemListGrid/ItemListGrid'
import useItemSearchQuery from '../../../apis/search/hooks/useItemSearchQuery'
import EmptyState from '../../../components/EmptyState'
import { Divider } from '../../item/detail/styles'

type Props = {
  keyword: string
}

const ItemResult = ({ keyword }: Props) => {
  const { searchItem } = useItemSearchQuery()
  const { data, error, status, isFetching, isFetchingNextPage, fetchNextPage } = searchItem(keyword)

  return (
    <>
      {data && data.pages[0].content.length > 0 ? (
        <ItemListGrid
          data={data}
          canChangeView={true}
          isFetching={isFetching}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          status={status}
        ></ItemListGrid>
      ) : (
        <>
          <EmptyState
            icon='search'
            title='아이템 검색 결과가 없어요'
            subtitle='다른 키워드로 검색해 주시거나
철자와 띄어쓰기를 확인해 주세요'
          ></EmptyState>
          <Divider></Divider>
        </>
      )}
    </>
  )
}

export default ItemResult
