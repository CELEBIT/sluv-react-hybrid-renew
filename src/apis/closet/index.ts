import request from '../core'
import { ResponseType } from '../core/type'
import { ClosetBoxModel } from './model'

export interface GetClosetListResult {
  closetCount: number
  closetList: ClosetBoxModel[]
}

const BASE_PATH = '/app/closet'

/**
 *  GET /app/closet/list
 */
export const getClosetList = async (): Promise<ResponseType<GetClosetListResult>> => {
  return await request.get(`${BASE_PATH}/list`)
}
