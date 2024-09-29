import ClosetBoxCreatePage from '../create'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { ClosetBoxService } from '../services'

export const ClosetBoxEditPage = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const params: ClosetBoxService = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    id: queryParams.get('id'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    name: queryParams.get('name'),

    coverImgUrl: queryParams.get('coverImgUrl'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    closetStatus: queryParams.get('closetStatus'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    colorScheme: queryParams.get('colorScheme'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    itemNum: queryParams.get('itemNum'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    coverImageMode: queryParams.get('coverImageMode'),
  }

  return <ClosetBoxCreatePage isEditMode={true} service={params} />
}

export default ClosetBoxEditPage
