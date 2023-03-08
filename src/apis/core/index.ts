type BaseResponse<T = any> = {
  isSuccess: boolean,
  message: string,
  result: T
}

