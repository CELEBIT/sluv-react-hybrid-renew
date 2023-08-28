import request from '../core'
import { ResponseType } from '../core/type'
export const ClosetService = {}

export interface GetClosetListResult {
  name: string
  coverImgUrl: string
  closetStatus: 'PUBLIC' | 'PRIVATE'
  color: string
  itemNum: number
}

const BASE_PATH = '/app/closet'

/**
 *  GET /app/closet/list
 */
export const getClosetList = async () => {
  const res = await request.get<ResponseType<GetClosetListResult[]>>(`${BASE_PATH}/list`)

  return res.data
}
