import { CreateClosetFormContext } from '../../create'
import { useCreateClosetFormContext } from '../../create/hooks'
import ClosetCreateBox from './index'

export const DefaultCreateBox = () => {
  const context = useCreateClosetFormContext()

  return (
    <CreateClosetFormContext.Provider value={context}>
      <ClosetCreateBox />
    </CreateClosetFormContext.Provider>
  )
}

export default DefaultCreateBox
