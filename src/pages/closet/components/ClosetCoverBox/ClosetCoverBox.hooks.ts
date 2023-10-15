import { useQuery } from '@tanstack/react-query'
import { closetQueryConfig } from '../../../../apis/closet/hooks'
import { GetClosetListResult } from '../../../../apis/closet'

export type UseClosetCoverBoxProps = GetClosetListResult
