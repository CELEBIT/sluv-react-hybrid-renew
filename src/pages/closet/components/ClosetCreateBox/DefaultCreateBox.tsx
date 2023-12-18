import ClosetCreateBox from './index'
import { useCreateClosetFormContext } from '../../create/hooks'
import { CreateClosetFormContext } from '../../create'
import React from 'react'

export const DefaultCreateBox = () => {
  const context = useCreateClosetFormContext()

  return (
    <CreateClosetFormContext.Provider value={context}>
      <ClosetCreateBox />
    </CreateClosetFormContext.Provider>
  )
}

export default DefaultCreateBox
