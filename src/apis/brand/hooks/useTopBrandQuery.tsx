import { useQuery } from '@tanstack/react-query'
import BrandService from '../brandService'
import { queryKeys } from '../../../config/queryKeys'

const useTopBrandQuery = () => {
  const brand = new BrandService()
  const getTopBrand = useQuery(queryKeys.brandTop, () => brand.getBrandTop())
  return { getTopBrand }
}

export default useTopBrandQuery
