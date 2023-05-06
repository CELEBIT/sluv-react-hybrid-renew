import { useQuery } from '@tanstack/react-query'
import ItemService from '../itemService'

const useTempItemQuery = () => {
  const item = new ItemService()
  const getTempItem = useQuery(['temp'], () => item.getItemCategory())
  return { getTempItem }
}

export default useTempItemQuery
