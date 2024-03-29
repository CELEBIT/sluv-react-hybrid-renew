import { Term } from '../models/signup'

export const ACCESS_TOKEN = 'accessToken'
export const MAX_INT = 2147483647
export const urlRegex =
  /(?:^|\s)(https?:\/\/[\w-]+(?:\.[\w-]+)+[\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-]+)/

export const colorList = ['pink', 'orange', 'yellow', 'green', 'blue']

export const 약관목록 = [
  {
    id: '01',
    title: '만 14세 이상',
    mandatory: true,
  },
  {
    id: '02',
    title: '이용약관 동의',
    link: '/settings/terms',
    mandatory: true,
    content: '필수 이용약관',
  },
  {
    id: '03',
    title: '개인정보 처리방침 동의',
    link: '/settings/privacy',
    mandatory: true,
  },
  {
    id: '04',
    title: '광고성 정보 수신 및 마케팅 활용 동의',
    link: '/settings/privacy',
    mandatory: false,
  },
] as Term[]
