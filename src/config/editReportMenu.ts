export interface reasonList {
  reason: string
  displayText: string
}

export const editReasonList = [
  { reason: 'WRONG_CELEB', displayText: '해당 셀럽의 아이템이 아니에요' },
  { reason: 'WRONG_DATE_PLACE', displayText: '날짜 / 장소가 잘못 되었어요' },
  { reason: 'WRONG_BRAND_ITEM_NAME', displayText: '브랜드 / 상품명이 잘못 되었어요' },
  { reason: 'WRONG_PRICE', displayText: '가격대가 잘못 되었어요' },
  { reason: 'MODIFY_IMG', displayText: '사진 변경을 요청해요' },
  { reason: 'MODIFY_CATEGORY', displayText: '아이템 카테고리 변경을 요청해요' },
  { reason: 'WRONG_LINK', displayText: '해당 상품의 구매 링크가 아니에요' },
  { reason: 'ETC', displayText: '기타' },
]

export const reportItemReasonList = [
  { reason: 'SPAM_OR_AD', displayText: '스팸 / 홍보성 게시글이에요' },
  { reason: 'ANNOY_CELEB', displayText: '셀럽에게 피해가 가는 게시글이에요' },
  { reason: 'OFF_TOPIC', displayText: '주제와 맞지 않는 게시글이에요' },
  { reason: 'COPY_PASTE', displayText: '해당 게시글로 도배되었어요' },
  { reason: 'SEXUAL_HARASSMENT', displayText: '외설적인 표현이 담겨있어요' },
  { reason: 'ETC', displayText: '기타' },
]

export const reportUserReasonList = [
  { reason: 'SELLER', displayText: '판매업자 활동을 해요' },
  { reason: 'BAD_MANNOR', displayText: '비매너적인 활동을 해요' },
  { reason: 'COPY_PASTE', displayText: '반복적으로 똑같은 정보를 도배해요' },
  { reason: 'JUST_BLAME', displayText: '단순 비방으로 불쾌감을 유발해요' },
  { reason: 'SWEARING', displayText: '욕설을 해요' },
  { reason: 'SEXUAL_HARRASSMENT', displayText: '성희롱을 해요' },
  { reason: 'ETC', displayText: '기타' },
]
