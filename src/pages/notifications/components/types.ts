import { Img } from '../../../apis/comment/commentService.type'

export type AlarmStatus = 'ACTIVE' | 'READ' | 'DELETED'

export enum NotificationType {
  ITEM = 'item', // 게시글 좋아요
  QUESTION = 'question', // 커뮤니티 좋아요
  USER = 'user', // 팔로우
  NOTICE = 'notice', // 스럽 공지사항
  COMMENT = 'comment', // 댓글, 댓글 좋아요
  REPORT = 'report', // 신고
  EDIT = 'edit', // 수정 요청
  VOTE = 'vote', // 투표
}

export interface INotification {
  alarmId: number
  title: string
  body: string
  type: NotificationType
  itemId: number
  questionId: number
  commentId: number
  followerId: number
  images: Array<Img>
  userImageUrl: string
  cratedAt: string
  alarmStatus: AlarmStatus
  itemEditId?: number
}

export interface INotificationRead {
  isAllRead: boolean
}
