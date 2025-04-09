import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../../../config/queryKeys'
import QuestionService from '../questionService'

export interface IVote {
  questionId: number
  voteSortOrder: number
}

const useCommunityHomeQuery = () => {
  const question = new QuestionService()

  const getCommunityBannerItems = () => {
    return useQuery(queryKeys.getCommunityBannerItems, () => question.getCommunityBannerItems())
  }

  return {
    getCommunityBannerItems,
  }
}

export default useCommunityHomeQuery
