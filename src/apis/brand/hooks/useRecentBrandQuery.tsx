import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import BrandService from '../brandService'
import { queryKeys } from '../../../config/queryKeys'
import { BrandFlag } from '../../core/type'

interface IDeleteBrand {
  brandId: number
  flag: BrandFlag
}

const useRecentBrandQuery = () => {
  const brand = new BrandService()
  const queryClient = useQueryClient()
  const getBrandRecentSelected = useQuery(queryKeys.brandRecentSelected, () =>
    brand.getBrandRecentSelected(),
  )
  const deleteRecentBrand = useMutation(
    ({ brandId, flag }: IDeleteBrand) => brand.deleteRecentBrand(brandId, flag),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.brandRecentSelected)
      },
    },
  )
  const deleteAllRecentBrands = useMutation(() => brand.deleteAllRecentBrands(), {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.brandRecentSelected)
    },
  })

  return { getBrandRecentSelected, deleteRecentBrand, deleteAllRecentBrands }
}

export default useRecentBrandQuery
