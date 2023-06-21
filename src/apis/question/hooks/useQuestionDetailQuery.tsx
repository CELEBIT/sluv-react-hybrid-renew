import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import QuestionService from '../questionService'
import { queryKeys } from '../../../config/queryKeys'

const useQuestionDetailQuery = () => {
  const question = new QuestionService()
  const queryClient = useQueryClient()

  const getQuestionDetail = (questionId: number) => {
    return useQuery(queryKeys.questionDetail(questionId), () =>
      question.getQuestionDetail(questionId),
    )
  }

  return { getQuestionDetail }
}

export default useQuestionDetailQuery
