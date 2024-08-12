import request from '../core'
import { GetPaginationResult, ResponseType } from '../core/type'
import dev from '../core/dev'
import { INotification } from '../../pages/notifications/components/types'

export default class NotificationService {
  notificationUrl: string

  constructor() {
    this.notificationUrl = '/app/alarm'
  }

  // 푸쉬알림 전체
  async getNotificationList(page: number) {
    const data: ResponseType<GetPaginationResult<INotification>> = await request.get(
      `${this.notificationUrl}`,
      {
        params: {
          page,
        },
      },
    )
    return data.result
  }

  // 푸쉬알림 전체
  async getDevNotificationList(page: number) {
    const data: ResponseType<GetPaginationResult<Notification>> = await dev.get(
      `${this.notificationUrl}`,
      {
        params: {
          page,
        },
      },
    )
    return data.result
  }

  // 푸쉬알림 선택 삭제
  async deleteNotification(idArray: Array<number>) {
    const result = await Promise.allSettled(
      idArray.map(async (id) => {
        const data: ResponseType = await request.delete(`${this.notificationUrl}/${id}`)
        return data
      }),
    )
    return await result
  }

  // 푸쉬알림 전체 삭제
  async deleteAllNotifications() {
    const data: ResponseType = await dev.delete(`${this.notificationUrl}/all`)
    return data
  }
}
