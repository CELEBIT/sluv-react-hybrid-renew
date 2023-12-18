import React from 'react'
import { useQuery } from '@tanstack/react-query'

import SearchService from '../searchService'
import { queryKeys } from '../../../config/queryKeys'

const useSearchRankQuery = () => {
  const search = new SearchService()

  const getSearchRank = useQuery(queryKeys.getSearchRank, () => search.getSearchRank())
  console.log(getSearchRank.data)
  return { getSearchRank }
}

export default useSearchRankQuery
