import { useQuery } from '@tanstack/react-query'
import BrandService from '../brandService'
import { queryKeys } from '../../../config/queryKeys'

const useRecentBrandQuery = () => {
  const brand = new BrandService()
  const getBrandRecentSelected = useQuery(queryKeys.brandRecentSelected, () =>
    brand.getBrandRecentSelected(),
  )
  return { getBrandRecentSelected }
}

export default useRecentBrandQuery
