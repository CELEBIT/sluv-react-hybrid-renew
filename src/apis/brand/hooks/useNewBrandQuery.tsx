import BrandService from '../brandService'
import { useMutation } from '@tanstack/react-query'
import useRecentBrandQuery from './useRecentBrandQuery'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { createItemNewBrandState, itemInfoState } from '../../../recoil/itemInfo'

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
        // setItemInfo({
        //   ...itemInfo,
        //   newBrand: {
        //     brandId: res?.newBrandId,
        //     brandName: res?.newBrandName,
        //     brandImgUrl: '',
        //   },
        //   brand: null,
        // })
      },
    },
  )
  return { postNewBrand }
}

export default useNewBrandQuery
