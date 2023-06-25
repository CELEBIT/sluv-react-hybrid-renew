import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import QuestionService from '../questionService'
import { queryKeys } from '../../../config/queryKeys'

export interface IVote {
  questionId: number
  voteSortOrder: number
}

const useQuestionDetailQuery = () => {
  const question = new QuestionService()
  const queryClient = useQueryClient()

  const getQuestionDetail = (questionId: number) => {
    return useQuery(queryKeys.questionDetail(questionId), () =>
      question.getQuestionDetail(questionId),
    )
  }

  const getWaitQuestion = (questionId: number, qType: string) => {
    return useQuery(queryKeys.recommendWait(questionId), () =>
      question.getWaitQusestion(questionId, qType),
    )
  }

  const voteItem = useMutation(
    ({ questionId, voteSortOrder }: IVote) => question.voteItem(questionId, voteSortOrder),
    {
      onSuccess: (res, { questionId }) => {
        queryClient.invalidateQueries(queryKeys.questionDetail(questionId))
      },
    },
  )

  return { getQuestionDetail, getWaitQuestion, voteItem }
}

export default useQuestionDetailQuery
