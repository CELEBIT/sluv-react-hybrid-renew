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

const useSearchCommentQuery = () => {
  const comment = new CommentService()
  const queryClient = useQueryClient()

  const getComment = (questionId: number) => {
    return useQuery(queryKeys.comment(questionId), () => comment.getComment(questionId))
  }

  const addComment = useMutation(
    ({ questionId, content, imgList, itemList }: IAddComment) =>
      comment.addComment(questionId, content, imgList, itemList),
    {
      onSuccess: (res, { questionId }) => {
        console.log(res)
        queryClient.invalidateQueries(queryKeys.comment(questionId))
      },
    },
  )

  return { getComment, addComment }
}

export default useSearchCommentQuery
