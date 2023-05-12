import { UseInfiniteQueryResult, useInfiniteQuery } from '@tanstack/react-query'
import BrandService, { TopBrandResult } from '../brandService'
import { queryKeys } from '../../../config/queryKeys'
import { GetPaginationResult } from '../../core/type'

const useBrandSearchQuery = () => {
  const brand = new BrandService()

  const searchBrand = (
    brandName: string,
  ): UseInfiniteQueryResult<GetPaginationResult<TopBrandResult>, any> => {
    return useInfiniteQuery(
      queryKeys.searchBrand(brandName),
      ({ pageParam = 0 }) => brand.searchBrand(brandName, pageParam),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.hasNext) return lastPage.page + 1
          return undefined
        },
      },
    )
  }
  return { searchBrand }
}

export default useBrandSearchQuery
