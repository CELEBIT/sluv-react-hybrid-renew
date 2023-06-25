import { UseInfiniteQueryResult, useInfiniteQuery } from '@tanstack/react-query'
import { GetPaginationResult } from '../../core/type'
import UserService from '../userService'
import { queryKeys } from '../../../config/queryKeys'
import { ItemResult } from '../../item/itemService.type'

const useUserItemQuery = () => {
  const user = new UserService()

  const getUserUploadItem = (): UseInfiniteQueryResult<GetPaginationResult<ItemResult>, any> => {
    return useInfiniteQuery(
      queryKeys.userUploadItem,
      ({ pageParam = 0 }) => user.getUserUploadItem(pageParam),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.hasNext) return lastPage.page + 1
          return undefined
        },
      },
    )
  }
  return { getUserUploadItem }
}

export default useUserItemQuery
