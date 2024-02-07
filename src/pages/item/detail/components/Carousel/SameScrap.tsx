import React from 'react'
import useItemDetailQuery from '../../../../../apis/item/hooks/useItemDetailQuery'
import RecommendedItemList from '../../../../../components/RecommendedItem/RecommendedItemList'

interface SameScrapProps {
  itemId: number
}

function SameScrap({ itemId }: SameScrapProps) {
  const { getSameScrapItem } = useItemDetailQuery()
  const { data } = getSameScrapItem(Number(itemId))
  return (
    <>
      {data && data?.length > 0 && (
        <RecommendedItemList
          title='다른 스러버들이 함께 보관한 아이템'
          list={data}
        ></RecommendedItemList>
      )}
    </>
  )
}

export default SameScrap
