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

  const getNotificationReadStatus = () => {
    return useQuery(
      queryKeys.getNotificationReadStatus,
      () => notification.getNotificationReadStatus(),
      {
        cacheTime: 60000, // 1분 동안 캐시로 저장
        staleTime: 1000,
      },
    )
  }

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

  const readNotification = useMutation(
    (notificationId: number) => notification.readNotification(notificationId),
    {
      onSuccess: (res) => {
        console.log(res)
        queryClient.invalidateQueries(queryKeys.getNotificationList)
      },
    },
  )

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

  return {
    getNotificationReadStatus,
    getNotificationList,
    readNotification,
    deleteNotification,
    deleteAllNotifications,
  }
}

export default useNotificationQuery
