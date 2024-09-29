import BrandService from '../brandService'
import { useMutation } from '@tanstack/react-query'
import useRecentBrandQuery from './useRecentBrandQuery'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import {
  createItemBrandState,
  createItemNewBrandState,
  itemInfoState,
} from '../../../recoil/itemInfo'

interface INewBrand {
  newBrandName: string
}

const useNewBrandQuery = () => {
  const brand = new BrandService()
  const {
    postRecentBrand: { mutate: mutateByPostRecentBrand },
  } = useRecentBrandQuery()

  // const [itemInfo, setItemInfo] = useRecoilState(itemInfoState)
  const setNewBrand = useSetRecoilState(createItemNewBrandState)
  const resetBrand = useResetRecoilState(createItemBrandState)

  const postNewBrand = useMutation(
    ({ newBrandName }: INewBrand) => brand.postNewBrand(newBrandName),
    {
      onSuccess: (res) => {
        mutateByPostRecentBrand({
          brandId: null,
          newBrandId: res?.newBrandId ?? null,
        })
        setNewBrand({
          brandId: res?.newBrandId ?? 0,
          brandName: res?.newBrandName ?? '',
        })
        resetBrand()
      },
    },
  )
  return { postNewBrand }
}

export default useNewBrandQuery
