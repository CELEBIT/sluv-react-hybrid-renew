import request from '../core'
import { GetPaginationResult, ResponseType } from '../core/type'
import { CommentResult, Img, ItemPost } from './commentService.type'
import dev from '../core/dev'

export default class CommentService {
  commentUrl: string

  constructor() {
    this.commentUrl = '/app/comment'
  }

  // 질문 게시글 댓글 조회
  async getCommentList(questionId: number) {
    const data: ResponseType<GetPaginationResult<CommentResult>> = await request.get(
      `${this.commentUrl}/${questionId}`,
      {
        params: {
          page: 0,
          size: 20,
        },
      },
    )
    return data.result?.content
  }

  async getTestCommentList(questionId: number) {
    const data: ResponseType<GetPaginationResult<CommentResult>> = await dev.get(
      `${this.commentUrl}/${questionId}`,
      {
        params: {
          page: 0,
          size: 20,
        },
      },
    )
    return data.result?.content
  }

  // 댓글 단건 조회
  async getComment(commentId: number) {
    const data: ResponseType<CommentResult> = await request.get(
      `${this.commentUrl}/detail/${commentId}`,
    )
    return data.result
  }
  // 댓글 단건 조회
  async getTestComment(commentId: number) {
    const data: ResponseType<CommentResult> = await dev.get(
      `${this.commentUrl}/detail/${commentId}`,
    )
    return data.result
  }

  // 댓글 등록
  async addComment(
    questionId: number,
    content: string | null,
    imgList: Array<Img> | null,
    itemList: Array<ItemPost> | null,
  ) {
    const data: ResponseType = await request.post(`${this.commentUrl}/${questionId}`, {
      content,
      imgList,
      itemList,
    })
    return data
  }

  async editComment(
    commentId: number,
    content: string | null,
    imgList: Array<Img> | null,
    itemList: Array<ItemPost> | null,
  ) {
    const data: ResponseType = await request.put(`${this.commentUrl}/${commentId}`, {
      content,
      imgList,
      itemList,
    })
    return data
  }

  // 질문 게시글 답글 조회
  async getSubComment(commentId: number, size?: number) {
    // console.log('size in getSubComment', size)
    const data: ResponseType<GetPaginationResult<CommentResult>> = await request.get(
      `${this.commentUrl}/${commentId}/subcomment`,
      {
        params: {
          page: 0,
          size: size || 2,
        },
      },
    )
    return data.result
  }

  // 답글 등록
  async addSubComment(
    questionId: number,
    commentId: number,
    content: string | null,
    imgList: Array<Img> | null,
    itemList: Array<ItemPost> | null,
  ) {
    const data: ResponseType = await request.post(`${this.commentUrl}/${questionId}/${commentId}`, {
      content,
      imgList,
      itemList,
    })
    return data
  }

  // 댓글/대댓글 좋아요
  async likeComment(commentId: number) {
    const data: ResponseType = await request.post(`${this.commentUrl}/${commentId}/like`)
    return data
  }

  async deleteComment(commentId: number) {
    const data: ResponseType = await request.delete(`${this.commentUrl}/${commentId}`)
    return data
  }
}
