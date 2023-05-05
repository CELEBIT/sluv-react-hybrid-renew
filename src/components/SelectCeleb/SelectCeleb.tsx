import React from 'react'
import { atom } from 'recoil'
import { atomKeys } from '../../config/atomKeys'

export interface CelebData {
  id?: number
  celebNameKr?: string
  subCelebList?: {
    id: number
    celebNameKr: string
  }[]
}
export interface Celeb {
  id: number
  celebNameKr: string
}

export const selectedGroupState = atom<CelebData>({
  key: atomKeys.selectedGroupState,
  default: { id: 0, celebNameKr: '', subCelebList: [] },
})

export const selectedCelebState = atom<number | undefined>({
  key: atomKeys.selectedCelebState,
  default: 0,
})
const SelectCeleb = () => {
  return <div>SelectCeleb</div>
}

export default SelectCeleb
