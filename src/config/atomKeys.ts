import { atom } from 'recoil'
import { Brand } from '../pages/item/create/components/BrandItemField/BrandItemField'

// 날짜, 장소 Atoms //
export const selectedDateState = atom<Date | undefined>({
  // API 호출 시 null로 변환해서 전달
  key: 'selectedDateState',
  default: undefined,
})

export const selectedPlaceState = atom<string>({
  key: 'selectedPlaceState',
  default: '',
})

// 브랜드, 제품명 Atoms //

export const selectedBrandState = atom<Brand>({
  key: 'selectedBrand',
  default: {},
})

export const itemNameState = atom<string>({
  key: 'itemName',
  default: '',
})

// 아이템 가격 Atoms
export const itemPriceState = atom<number | undefined>({
  key: 'itemPriceState',
  default: 0,
})

// 추가정보 페이지 Atoms //
export const addInfoTextState = atom<string>({
  key: 'addInfoTextState',
  default: '',
})

export const infoSourceState = atom<string>({
  key: 'infoSourceState',
  default: '',
})

export const hashTagState = atom<Array<string>>({
  key: 'hashTagState',
  default: [],
})
