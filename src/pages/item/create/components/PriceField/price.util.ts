export const formatPrice = (price?: number | null) => {
  // ~ 원대 로 format하는 함수입니다
  if (!price) {
    return '-'
  }
  if (price < 1000) {
    return `${price.toLocaleString()}원`
  } else if (price < 10000) {
    const amount = Math.floor(price / 1000)
    return `${amount.toLocaleString()}천원`
  } else if (price < 100000000) {
    const amount = Math.floor(price / 10000)
    return `${amount.toLocaleString()}만원`
  } else if (price < 1000000000) {
    const tenMillionWon = Math.floor((price % 100000000) / 10000000)
    const billionWon = Math.floor(price / 100000000)
    const tenMillionWonText = tenMillionWon > 0 ? `${tenMillionWon}천만` : ''
    const billionWonText = `${billionWon}억`
    return `${billionWonText} ${tenMillionWonText}원`
  } else {
    const amount = Math.floor(price / 100000000)
    return `${amount.toLocaleString()}억원`
  }
}

export const sanitizePriceInput = (input: string) => input.replace(/,/g, '')

export const addCommas = (value: string) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
