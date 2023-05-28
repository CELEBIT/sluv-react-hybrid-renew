import { useRecoilValue } from 'recoil'
import { celebInfoInItemState, itemInfoState } from '../recoil/itemInfo'
import { useEffect } from 'react'
import { useDebounce } from 'use-debounce'

const useUploadStateObserver = () => {
  const itemInfo = useRecoilValue(itemInfoState)
  const celebInfo = useRecoilValue(celebInfoInItemState)
  const [debounceItemInfo] = useDebounce(itemInfo, 500)
  const [debounceCelebInfo] = useDebounce(celebInfo, 500)

  useEffect(() => {
    // Recoil 상태 변화 감지 시 동작 수행
    console.log('Recoil 상태 변화 감지')
  }, [debounceItemInfo, debounceCelebInfo])
}

export default useUploadStateObserver
