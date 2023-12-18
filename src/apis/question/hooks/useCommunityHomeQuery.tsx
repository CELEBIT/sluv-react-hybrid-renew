import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import QuestionService from '../questionService'
import { queryKeys } from '../../../config/queryKeys'
import { EditRequestReason } from '../../../pages/item/editRequest'
import useModals from '../../../components/Modals/hooks/useModals'
import { modals } from '../../../components/Modals'
import { useNavigate } from 'react-router-dom'

export interface IVote {
  questionId: number
  voteSortOrder: number
}

interface IReportQuestion {
  questionId: number
  requestContent: EditRequestReason
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
