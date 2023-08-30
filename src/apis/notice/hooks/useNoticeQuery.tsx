import { UseInfiniteQueryResult, useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { GetPaginationResult } from '../../core/type'
import NoticeService from '../noticeService'
import { queryKeys } from '../../../config/queryKeys'
import { Notice } from '../../../pages/user/components/Notice/EachNotice/EachNotice'

const useNoticeQuery = () => {
  const notice = new NoticeService()

  const getNoticeList = (): UseInfiniteQueryResult<GetPaginationResult<Notice>, any> => {
    return useInfiniteQuery(
      queryKeys.noticeList,
      ({ pageParam = 0 }) => notice.getNoticeList(pageParam),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.hasNext) return lastPage.page + 1
          return undefined
        },
      },
    )
  }

  const getNoticeDetail = (noticeId: number) => {
    return useQuery(queryKeys.noticeDetail(noticeId), () => notice.getNoticeDetail(noticeId))
  }

  return { getNoticeList, getNoticeDetail }
}

export default useNoticeQuery
