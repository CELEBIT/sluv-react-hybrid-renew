// import request from '../core'
// import { GetPaginationResult, ResponseType } from '../core/type'

// export interface CommentResult {}

// export default class CommentService {
//   commentUrl: string

//   constructor() {
//     this.commentUrl = '/app/comment'
//   }
//   async searchComment(questionId: number) {
//     const data: ResponseType<GetPaginationResult<CommentResult>> = await request.get(
//       `${this.commentUrl}/${questionId}`,
//       {
//         params: {
//           page: 0,
//           size: 20,
//         },
//       },
//     )
//     return data.result?.content
//   }
// }
