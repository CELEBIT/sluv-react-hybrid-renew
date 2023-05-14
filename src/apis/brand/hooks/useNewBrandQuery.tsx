import BrandService from '../brandService'
import { useMutation } from '@tanstack/react-query'
import useRecentBrandQuery from './useRecentBrandQuery'
import { useSetRecoilState } from 'recoil'
import { selectedBrandState } from '../../../pages/item/create/components/BrandItemField/BrandItemField'
import { BrandFlag } from '../../core/type'

interface INewBrand {
  newBrandName: string
}

const useNewBrandQuery = () => {
  const brand = new BrandService()
  const {
    postRecentBrand: { mutate: mutateByPostRecentBrand },
  } = useRecentBrandQuery()

  const setBrand = useSetRecoilState(selectedBrandState)

  const postNewBrand = useMutation(
    ({ newBrandName }: INewBrand) => brand.postNewBrand(newBrandName),
    {
      onSuccess: (res) => {
        mutateByPostRecentBrand({
          brandId: null,
          newBrandId: res?.newBrandId ?? null,
        })
        setBrand({
          id: res?.newBrandId,
          brandKr: res?.newBrandName,
          flag: 'N' as BrandFlag,
        })
      },
    },
  )
  return { postNewBrand }
}

export default useNewBrandQuery
