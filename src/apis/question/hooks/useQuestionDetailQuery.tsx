import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import QuestionService from '../questionService'
import { queryKeys } from '../../../config/queryKeys'
import { EditRequestReason } from '../../../pages/item/editRequest'
import useModals from '../../../components/Modals/hooks/useModals'
import { modals } from '../../../components/Modals'
import { useNavigate } from 'react-router-dom'
import { useResetRecoilState } from 'recoil'
import { commentState } from '../../../pages/community/detail/CommunityDetail'

export interface IVote {
  questionId: number
  voteSortOrder: number
}

interface IReportQuestion {
  questionId: number
  requestContent: EditRequestReason
}

interface IReportComment {
  commentId: number
  requestContent: EditRequestReason
}

const useQuestionDetailQuery = () => {
  const question = new QuestionService()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { openModal } = useModals()
  const resetCommentObject = useResetRecoilState(commentState)

  const getQuestionDetail = (questionId: number) => {
    return useQuery(queryKeys.questionDetail(questionId), () =>
      question.getQuestionDetail(questionId),
    )
  }

  const getTestQuestionDetail = (questionId: number) => {
    return useQuery(queryKeys.questionDetail(questionId), () =>
      question.testQuestionDetail(questionId),
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
        //
        queryClient.invalidateQueries()
        // queryClient.invalidateQueries(queryKeys.questionDetail(questionId))
        // queryClient.invalidateQueries(queryKeys.getQuestionBuyList('전체'))
        // queryClient.invalidateQueries(queryKeys.getQuestionBuyList('진행 중'))
        // queryClient.invalidateQueries(queryKeys.getQuestionBuyList('종료 임박'))
        // queryClient.invalidateQueries(queryKeys.getQuestionBuyList('종료'))
      },
    },
  )

  const reportQuestion = useMutation(
    ({ questionId, requestContent }: IReportQuestion) =>
      question.reportQuestion(questionId, requestContent.reason, requestContent.content),
    {
      onSuccess: (res) => {
        if (res.code == 1000) {
          resetCommentObject()
          openModal(modals.ReportQuestionCompleteModal)
        }
      },
      onError: (error: any) => {
        if (error.response.data.code === 2013) {
          openModal(modals.DuplicateReportModal)
        }
      },
    },
  )

  const reportComment = useMutation(
    ({ commentId, requestContent }: IReportComment) =>
      question.reportComment(commentId, requestContent.reason, requestContent.content),
    {
      onSuccess: (res) => {
        if (res.code == 1000) {
          openModal(modals.ReportCommentCompleteModal)
        }
      },
      onError: (error: any) => {
        if (error.response.data.code === 2016) {
          openModal(modals.DuplicateReportModal)
        }
      },
    },
  )

  const deleteQuestion = useMutation((questionId: number) => question.deleteQuestion(questionId), {
    onSuccess: () => {
      queryClient.invalidateQueries()
      navigate('/community')
    },
  })

  const likeQuestion = useMutation((questionId: number) => question.likeQusetion(questionId), {
    onSuccess: (res, questionId) => {
      //
      queryClient.invalidateQueries()
    },
  })

  return {
    getQuestionDetail,
    getTestQuestionDetail,
    getWaitQuestion,
    voteItem,
    reportQuestion,
    reportComment,
    deleteQuestion,
    likeQuestion,
  }
}

export default useQuestionDetailQuery
