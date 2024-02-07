const getRandomChar = (): string => {
  const charType = Math.floor(Math.random() * 3)
  switch (charType) {
    case 0: // 대문자
      return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
    case 1: // 소문자
      return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
    case 2: // 숫자
      return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
    default:
      return ''
  }
}

export const generateRandomHash = (): string => {
  return Array.from({ length: 64 }, getRandomChar).join('')
}
