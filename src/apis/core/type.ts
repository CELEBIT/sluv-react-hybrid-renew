export interface GetResponseType<T> {
  isSuccess: boolean
  code: number
  message: string
  result?: T
}

export interface GetPaginationResult<T> {
  hasNext: boolean
  page: number
  content: Array<T>
}
