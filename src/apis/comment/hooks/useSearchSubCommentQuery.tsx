import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import CommentService from '../commentService'
import { queryKeys } from '../../../config/queryKeys'
import { Img, ItemPost, NewComment } from '../commentService.type'

export interface IAddSubComment {
  questionId: number
  commentId: number
  content: string | null
  imgList: Array<Img> | null
  itemList: Array<ItemPost> | null
}

const useSearchSubCommentQuery = () => {
  const comment = new CommentService()
  const queryClient = useQueryClient()

  const getSubComment = (commentId: number) => {
    return useQuery(queryKeys.subcomment(commentId), () => comment.getSubComment(commentId))
  }

  const addSubComment = useMutation(
    ({ questionId, commentId, content, imgList, itemList }: IAddSubComment) =>
      comment.addSubComment(questionId, commentId, content, imgList, itemList),
    {
      onSuccess: (res, { commentId }) => {
        console.log(res)
        queryClient.invalidateQueries(queryKeys.subcomment(commentId))
      },
    },
  )

  return { getSubComment, addSubComment }
}

export default useSearchSubCommentQuery
