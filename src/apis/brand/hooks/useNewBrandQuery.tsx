import BrandService from '../brandService'
import { useMutation } from '@tanstack/react-query'
import useRecentBrandQuery from './useRecentBrandQuery'
import { useRecoilState } from 'recoil'
import { itemInfoState } from '../../../recoil/itemInfo'

interface INewBrand {
  newBrandName: string
}

const useNewBrandQuery = () => {
  const brand = new BrandService()
  const {
    postRecentBrand: { mutate: mutateByPostRecentBrand },
  } = useRecentBrandQuery()

  const [itemInfo, setItemInfo] = useRecoilState(itemInfoState)

  const postNewBrand = useMutation(
    ({ newBrandName }: INewBrand) => brand.postNewBrand(newBrandName),
    {
      onSuccess: (res) => {
        mutateByPostRecentBrand({
          brandId: null,
          newBrandId: res?.newBrandId ?? null,
        })
        setItemInfo({
          ...itemInfo,
          newBrand: {
            brandId: res?.newBrandId,
            brandName: res?.newBrandName,
            brandImgUrl: '',
          },
          brand: null,
        })
      },
    },
  )
  return { postNewBrand }
}

export default useNewBrandQuery
