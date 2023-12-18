import { getCloset, getClosetList, PageParams, postCloset, PostClosetParams, putCloset } from '.'
import { ClosetBoxModel } from './model'

export const closetQueryConfig = {
  getClosetList: () => ({
    queryFn: () => getClosetList(),
    queryKey: ['get', 'closet', 'list'],
  }),

  postCloset: (params: PostClosetParams) => ({
    mutationFn: () => postCloset(params),
    mutaionKey: ['post', 'closet'],
  }),
  putCloset: (id: number, params: PostClosetParams) => ({
    mutationFn: () => putCloset(id, params),
    mutaionKey: ['put', 'closet'],
  }),
  getCloset: (id: ClosetBoxModel['id']) => ({
    queryFn: ({ pageParam = 1 }) => getCloset(id, pageParam),
    queryKey: ['get', 'closet', 'detail'],
  }),
}
