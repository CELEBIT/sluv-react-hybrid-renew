import { useQuery } from '@tanstack/react-query'
import ItemService from '../itemService'
import { queryKeys } from '../../../config/queryKeys'

const useTempItemQuery = () => {
  const item = new ItemService()
  const getTempItem = useQuery(queryKeys.tempItem, () => item.getItemCategory())
  return { getTempItem }
}

export default useTempItemQuery
