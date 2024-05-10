import React from 'react'
import useItemDetailQuery from '../../../../../apis/item/hooks/useItemDetailQuery'
import RecommendedItemList from '../../../../../components/RecommendedItem/RecommendedItemList'

interface SameCelebProps {
  itemId: number
  isPreview: boolean
}

function SameCeleb({ itemId, isPreview }: SameCelebProps) {
  const { getSameCelebItem } = useItemDetailQuery()
  const { data } = getSameCelebItem(Number(itemId))
  return (
    <>
      {data && data?.length > 0 && (
        <RecommendedItemList
          title='같은 셀럽의 아이템'
          list={data}
          isPreview={isPreview}
        ></RecommendedItemList>
      )}
    </>
  )
}

export default SameCeleb
