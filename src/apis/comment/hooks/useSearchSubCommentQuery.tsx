import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../../../config/queryKeys'
import CommentService from '../commentService'
import { Img, ItemPost } from '../commentService.type'

export interface IAddSubComment {
  questionId: number
  commentId: number
  content: string | null
  imgList: Array<Img> | null
  itemList: Array<ItemPost> | null
}

export interface ILikeSubComment {
  commentId: number
  subCommentId: number
}

const useSearchSubCommentQuery = () => {
  const comment = new CommentService()
  const queryClient = useQueryClient()

  const getSubComment = (commentId: number, size?: number) => {
    return useQuery(queryKeys.subcomment(commentId), () => comment.getSubComment(commentId, size))
  }

  const addSubComment = useMutation(
    ({ questionId, commentId, content, imgList, itemList }: IAddSubComment) =>
      comment.addSubComment(questionId, commentId, content, imgList, itemList),
    {
      onSuccess: () => {
        //
        queryClient.invalidateQueries()
      },
    },
  )

  const likeSubComment = useMutation(
    ({ subCommentId }: ILikeSubComment) => comment.likeComment(subCommentId),
    {
      onSuccess: (res, { commentId }) => {
        queryClient.invalidateQueries(queryKeys.subcomment(commentId))
      },
    },
  )

  return { getSubComment, addSubComment, likeSubComment }
}

export default useSearchSubCommentQuery
