import { getClosetList } from './index'

export const ClosetQueryConfig = {
  getClosetList: () => ({
    queryFn: () => getClosetList(),
    queryKey: ['get', 'closet', 'list'],
  }),
}
