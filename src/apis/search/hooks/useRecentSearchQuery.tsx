import React from 'react'
import SearchService from '../searchService'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../../../config/queryKeys'

const useRecentSearchQuery = () => {
  const search = new SearchService()
  const queryClient = useQueryClient()

  const getRecentSearch = useQuery(queryKeys.recentSearch, () => search.getRecentSearch())

  const deleteRecentSearch = useMutation((keyword: string) => search.deleteRecentSearch(keyword), {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.recentSearch)
    },
  })
  return { getRecentSearch, deleteRecentSearch }
}

export default useRecentSearchQuery
