import request from '../core'
import { ResponseType } from '../core/type'
import { ClosetBoxModel, ClosetItemModel, ClosetStatus } from './model'
import { CoverBoxColorKey } from '../../pages/closet/utils/consts'

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

export type PostClosetParams = {
  name: string
  coverImgUrl?: string | null
  closetStatus: ClosetStatus
  colorScheme: CoverBoxColorKey
}
export const postCloset = async (params: PostClosetParams): Promise<ResponseType<undefined>> => {
  const newCloset = { ...params, colorScheme: params.colorScheme }
  return await request.post(`${BASE_PATH}`, params)
}

export type GetClosetCheckNameRes = ResponseType<{
  isDuplicated: boolean
}>
export const getClosetCheckName = async (name: string): Promise<GetClosetCheckNameRes> => {
  return await request.get(`${BASE_PATH}/check-name`, { params: { name } })
}

export const deleteCloset = async (id: number): Promise<ResponseType> => {
  return await request.delete(`${BASE_PATH}/${id}`)
}

export const putCloset = async (
  id: number,
  params: PostClosetParams,
): Promise<ResponseType<undefined>> => {
  return await request.put(`${BASE_PATH}/${id}`, params)
}

export type GetClosetRes = ClosetBoxModel & {
  hasNext: boolean
  page: number
  content: ClosetItemModel[]
}

export type PageParams = {
  page: number
  size: number
}

export const getCloset = async (
  id: ClosetBoxModel['id'],
  pageParams: number,
): Promise<GetClosetRes> => {
  const customPageParams = {
    size: 12,
    page: pageParams,
  }
  return await request.get(`${BASE_PATH}/${id}`, { params: customPageParams })
}
