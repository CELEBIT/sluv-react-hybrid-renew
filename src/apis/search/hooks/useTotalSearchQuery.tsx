import React from 'react'
import SearchService from '../searchService'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../../../config/queryKeys'

const useTotalSearchQuery = () => {
  const search = new SearchService()

  const searchTotal = (keyword: string) => {
    return useQuery(queryKeys.searchTotal(keyword), () => search.searchTotal(keyword))
  }

  return { searchTotal }
}

export default useTotalSearchQuery
