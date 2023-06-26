import React from 'react'
import SearchService from '../searchService'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../../../config/queryKeys'

const useRecentSearchQuery = () => {
  const search = new SearchService()

  const getRecentSearch = useQuery(queryKeys.recentSearch, () => search.getRecentSearch())
  return { getRecentSearch }
}

export default useRecentSearchQuery
