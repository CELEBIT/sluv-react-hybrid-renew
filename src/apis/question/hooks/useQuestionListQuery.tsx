import { UseInfiniteQueryResult, useInfiniteQuery } from '@tanstack/react-query'
import QuestionService from '../questionService'
import { queryKeys } from '../../../config/queryKeys'
import { GetPaginationResult } from '../../core/type'
import { WaitResult } from '../questionService.type'

export interface IVote {
  questionId: number
  voteSortOrder: number
}

const useQuestionListQuery = (qType: string | undefined) => {
  const question = new QuestionService()

  const getQuestionList = (): UseInfiniteQueryResult<GetPaginationResult<WaitResult>, any> => {
    return useInfiniteQuery(
      queryKeys.getQuestionList(qType),
      ({ pageParam = 0 }) => question.getQuestionList(pageParam, qType),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.hasNext) return lastPage.page + 1
          return undefined
        },
      },
    )
  }

  return { getQuestionList }
}

export default useQuestionListQuery
