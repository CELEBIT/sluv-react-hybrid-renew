import {
  UseInfiniteQueryResult,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { GetPaginationResult } from '../../core/type'
import NotificationService from '../notificationService'
import { queryKeys } from '../../../config/queryKeys'
import { INotification } from '../../../pages/notifications/components/types'

const useNotificationQuery = () => {
  const notification = new NotificationService()
  const queryClient = useQueryClient()

  const getNotificationList = (): UseInfiniteQueryResult<
    GetPaginationResult<INotification>,
    any
  > => {
    return useInfiniteQuery(
      queryKeys.getNotificationList,
      ({ pageParam = 0 }) => notification.getNotificationList(pageParam),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.hasNext) return lastPage.page + 1
          return undefined
        },
      },
    )
  }

  const getDevNotificationList = (): UseInfiniteQueryResult<
    GetPaginationResult<INotification>,
    any
  > => {
    return useInfiniteQuery(
      queryKeys.getNotificationList,
      ({ pageParam = 0 }) => notification.getDevNotificationList(pageParam),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.hasNext) return lastPage.page + 1
          return undefined
        },
      },
    )
  }

  // 알림 선택 삭제
  const deleteNotification = useMutation(
    (notificationIdList: Array<number>) => notification.deleteNotification(notificationIdList),
    {
      onSuccess: (res) => {
        console.log(res)
        queryClient.invalidateQueries(queryKeys.getNotificationList)
      },
    },
  )
  // 알림 전체 삭제
  const deleteAllNotifications = useMutation(() => notification.deleteAllNotifications(), {
    onSuccess: (res) => {
      console.log(res)
      queryClient.invalidateQueries(queryKeys.getNotificationList)
    },
  })

  return { getNotificationList, getDevNotificationList, deleteNotification, deleteAllNotifications }
}

export default useNotificationQuery
