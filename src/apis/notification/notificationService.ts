import request from '../core'
import { GetPaginationResult, ResponseType } from '../core/type'
import dev from '../core/dev'
import { INotification, INotificationRead } from '../../pages/notifications/components/types'

export default class NotificationService {
  notificationUrl: string

  constructor() {
    this.notificationUrl = '/app/alarm'
  }

  async getNotificationReadStatus() {
    const data: ResponseType<INotificationRead> = await request.get(`${this.notificationUrl}/check`)
    return data.result
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

  async readNotification(notificationId: number) {
    const data: ResponseType = await request.patch(
      `${this.notificationUrl}/read?alarmId=${notificationId}`,
    )
    return data
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
    const data: ResponseType = await request.delete(`${this.notificationUrl}/all`)
    return data
  }
}
