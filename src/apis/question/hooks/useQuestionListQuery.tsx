import { UseInfiniteQueryResult, useInfiniteQuery } from '@tanstack/react-query'
import QuestionService from '../questionService'
import { queryKeys } from '../../../config/queryKeys'
import { GetPaginationResult } from '../../core/type'
import { BuyHomeResult, SearchQuestionResult } from '../../search/searchService'

export interface IVote {
  questionId: number
  voteSortOrder: number
}

const useQuestionListQuery = () => {
  const question = new QuestionService()

  const getQuestionTotalList = (): UseInfiniteQueryResult<
    GetPaginationResult<SearchQuestionResult>,
    any
  > => {
    return useInfiniteQuery(
      queryKeys.getQuestionTotalList,
      ({ pageParam = 0 }) => question.getQuestionTotalList(pageParam),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.hasNext) return lastPage.page + 1
          return undefined
        },
      },
    )
  }

  const getQuestionHotList = (): UseInfiniteQueryResult<
    GetPaginationResult<SearchQuestionResult>,
    any
  > => {
    return useInfiniteQuery(
      queryKeys.getQuestionHotList,
      ({ pageParam = 0 }) => question.getQuestionHotList(pageParam),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.hasNext) return lastPage.page + 1
          return undefined
        },
      },
    )
  }

  const getQuestionFindList = (
    celebId?: number,
  ): UseInfiniteQueryResult<GetPaginationResult<SearchQuestionResult>, any> => {
    return useInfiniteQuery(
      queryKeys.getQuestionFindList(celebId),
      ({ pageParam = 0 }) => question.getQuestionFindList(pageParam, celebId),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.hasNext) return lastPage.page + 1
          return undefined
        },
      },
    )
  }
  const getQuestionHowAboutList = (
    celebId?: number,
  ): UseInfiniteQueryResult<GetPaginationResult<SearchQuestionResult>, any> => {
    return useInfiniteQuery(
      queryKeys.getQuestionHowAboutList(celebId),
      ({ pageParam = 0 }) => question.getQuestionHowAboutList(pageParam, celebId),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.hasNext) return lastPage.page + 1
          return undefined
        },
      },
    )
  }
  const getQuestionBuyList = (
    voteStatus: string,
  ): UseInfiniteQueryResult<GetPaginationResult<BuyHomeResult>, any> => {
    return useInfiniteQuery(
      queryKeys.getQuestionBuyList(voteStatus),
      ({ pageParam = 0 }) => question.getQuestionBuyList(pageParam, voteStatus),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.hasNext) return lastPage.page + 1
          return undefined
        },
      },
    )
  }
  const getQuestionRecommendList = (
    hashtag?: string,
  ): UseInfiniteQueryResult<GetPaginationResult<SearchQuestionResult>, any> => {
    return useInfiniteQuery(
      queryKeys.getQuestionRecommendList(hashtag),
      ({ pageParam = 0 }) => question.getQuestionRecommendList(pageParam, hashtag),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.hasNext) return lastPage.page + 1
          return undefined
        },
      },
    )
  }

  return {
    getQuestionTotalList,
    getQuestionHotList,
    getQuestionFindList,
    getQuestionHowAboutList,
    getQuestionBuyList,
    getQuestionRecommendList,
  }
}

export default useQuestionListQuery
