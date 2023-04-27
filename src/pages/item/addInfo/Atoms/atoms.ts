import { atom } from 'recoil'

export const addInfoTextState = atom<string>({
  key: 'addInfoTextState',
  default: '',
})

export const infoSourceState = atom<string>({
  key: 'infoSourceState',
  default: '',
})
