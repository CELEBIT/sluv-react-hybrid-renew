export interface CommunityMenu {
  name: string
  url: string
}

export const CommunityMenuList = [
  {
    name: '찾아주세요',
    url: '/community/create/find-request',
  },
  {
    name: '이 중에 뭐 살까',
    url: '/community/create/buy',
  },
  {
    name: '이거 어때',
    url: '/community/create/howabout',
  },
  {
    name: '추천해 줘',
    url: '/community/create/recommend',
  },
]

export const QuestionMenuList = ['이 중에 뭐 살까', '이거 어때', '추천해 줘']

export const RecommendCategory = [
  '애착템',
  '입문템',
  '추천템',
  '가성비템',
  '후회없템',
  '선물템',
  '신박템',
  '기타',
]
