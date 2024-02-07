import ItemService from '../itemService'
import { useMutation, useQuery } from '@tanstack/react-query'
import { queryKeys } from '../../../config/queryKeys'
import { useSetRecoilState } from 'recoil'
import { hashTagState } from '../../../pages/item/addInfo/components/HashTags/HashTag'

interface IPostHashtag {
  hashtagContent: string
}

const useItemHashtagQuery = () => {
  const item = new ItemService()
  const setHashtags = useSetRecoilState(hashTagState)

  const searchHashtag = (name: string) => {
    return useQuery(queryKeys.searchHashtag(name), () => item.searchHashtag(name))
  }
  const postHashtag = useMutation(
    ({ hashtagContent }: IPostHashtag) => item.postHashtag(hashtagContent),
    {
      onSuccess: (res) => {
        if (res) {
          setHashtags((prevTags) => [...prevTags, res])
        }
      },
    },
  )
  return { searchHashtag, postHashtag }
}

export default useItemHashtagQuery
