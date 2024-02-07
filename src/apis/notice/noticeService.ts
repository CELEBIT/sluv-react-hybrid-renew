import { Notice } from '../../pages/user/components/Notice/EachNotice/EachNotice'
import request from '../core'
import { GetPaginationResult, ResponseType } from '../core/type'

export default class NoticeService {
  noticeUrl: string

  constructor() {
    this.noticeUrl = '/app/notice'
  }

  // 공지사항 전체
  async getNoticeList(page: number) {
    const data: ResponseType<GetPaginationResult<Notice>> = await request.get(`${this.noticeUrl}`, {
      params: {
        page,
      },
    })
    return data.result
  }

  // 공지사항 detail
  async getNoticeDetail(noticeId: number) {
    const data: ResponseType<Notice> = await request.get(`${this.noticeUrl}/${noticeId}`)

    return data.result
  }
}
