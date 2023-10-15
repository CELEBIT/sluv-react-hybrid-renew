import { getClosetList } from './index'
import { QueryKey, QueryOptions, UseQueryOptions } from '@tanstack/react-query'

export const closetQueryConfig = {
  getClosetList: () => ({
    queryFn: () => getClosetList(),
    queryKey: ['get', 'closet', 'list'],
  }),
}
