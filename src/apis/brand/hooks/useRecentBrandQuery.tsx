import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import BrandService from '../brandService'
import { queryKeys } from '../../../config/queryKeys'
import { BrandFlag } from '../../core/type'
import useModals from '../../../components/Modals/hooks/useModals'
import { modals } from '../../../components/Modals'

interface IDeleteBrand {
  brandId: number
  flag: BrandFlag
}
interface IPostBrand {
  brandId: number | null
  newBrandId: number | null
}

const useRecentBrandQuery = () => {
  const brand = new BrandService()
  const queryClient = useQueryClient()
  const { closeModal } = useModals()
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
  const postRecentBrand = useMutation(
    ({ brandId, newBrandId }: IPostBrand) => brand.postRecentBrand(brandId, newBrandId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.brandRecentSelected)
        closeModal(modals.ItemBrandSelectModal)
      },
    },
  )

  return {
    getBrandRecentSelected,
    deleteRecentBrand,
    deleteAllRecentBrands,
    postRecentBrand,
  }
}

export default useRecentBrandQuery
