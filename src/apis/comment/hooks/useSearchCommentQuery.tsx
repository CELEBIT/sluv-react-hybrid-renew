import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import CommentService from '../commentService'
import { queryKeys } from '../../../config/queryKeys'
import { Img, ItemPost, NewComment } from '../commentService.type'

export interface IAddComment {
  questionId: number
  content: string | null
  imgList: Array<Img> | null
  itemList: Array<ItemPost> | null
}

export interface IEditComment {
  questionId: number
  commentId: number
  content: string | null
  imgList: Array<Img> | null
  itemList: Array<ItemPost> | null
}

export interface ILikeComment {
  commentId: number
  questionId: number
}

const useSearchCommentQuery = () => {
  const comment = new CommentService()
  const queryClient = useQueryClient()

  const getCommentList = (questionId: number) => {
    return useQuery(queryKeys.comment(questionId), () => comment.getCommentList(questionId))
  }
  const getComment = (commentId: number) => {
    return useQuery(queryKeys.commentDetail(commentId), () => comment.getComment(commentId))
  }

  const addComment = useMutation(
    ({ questionId, content, imgList, itemList }: IAddComment) =>
      comment.addComment(questionId, content, imgList, itemList),
    {
      onSuccess: (res, { questionId }) => {
        //
        queryClient.invalidateQueries()
      },
    },
  )

  const editComment = useMutation(
    ({ commentId, content, imgList, itemList }: IEditComment) =>
      comment.editComment(commentId, content, imgList, itemList),
    {
      onSuccess: (res, { questionId }) => {
        //
        queryClient.invalidateQueries()
      },
    },
  )

  const likeComment = useMutation(({ commentId }: ILikeComment) => comment.likeComment(commentId), {
    onSuccess: (res, { questionId }) => {
      queryClient.invalidateQueries()
    },
  })

  const deleteComment = useMutation(
    ({ commentId }: ILikeComment) => comment.deleteComment(commentId),
    {
      onSuccess: (res, { questionId }) => {
        queryClient.invalidateQueries()
      },
    },
  )

  return { getCommentList, getComment, addComment, editComment, likeComment, deleteComment }
}

export default useSearchCommentQuery
