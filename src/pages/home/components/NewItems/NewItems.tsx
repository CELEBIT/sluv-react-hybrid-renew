import { useNavigate } from 'react-router-dom'
import { PreviewProps } from '../..'
import useNewItemQuery from '../../../../apis/item/hooks/useNewItemQuery'
import { ReactComponent as New } from '../../../../assets/badge_title_new.svg'
import Item from '../../../../components/RecommendedItem/Item'
import { ItemList } from '../../../../components/RecommendedItem/RecommendedItemList'
import { HomeTitle, HomeTitleWrapper, ScrollComponentWrapper } from '../../styles'

const NewItems = ({ isPreview }: PreviewProps) => {
  const navigate = useNavigate()

  const { getNewItem } = useNewItemQuery()
  const { data } = getNewItem()
  const tempData = data?.pages[0].content
  console.log(tempData)

  return (
    <ScrollComponentWrapper>
      <HomeTitleWrapper className='title'>
        <New></New>
        <HomeTitle>실시간 NEW 아이템</HomeTitle>
      </HomeTitleWrapper>
      <ItemList gap={10}>
        {tempData?.map((item) => {
          return (
            <Item
              key={'new' + item.itemId}
              {...item}
              size={150}
              borderRadius={8}
              onClick={() => navigate(`/item/detail/${item.itemId}`)}
              isPreview={isPreview}
            ></Item>
          )
        })}
      </ItemList>
    </ScrollComponentWrapper>
  )
}

export default NewItems
