export interface GetResponseType<T> {
  isSuccess: boolean
  code: number
  message: string
  result?: T
}
