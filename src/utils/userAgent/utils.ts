import { UserPlatform } from './types'

const IOS = 'iPhone|iPad|iPod|Mac'
const ANDROID = 'Android'

const getUserAgent = () => {
  return window.navigator.userAgent
}
export const getWebviewPlatform = (): UserPlatform => {
  const userAgent = getUserAgent()

  if (/IOS/.test(userAgent)) {
    return 'IOS'
  }

  if (/ANDROID/.test(userAgent)) {
    return 'Android'
  }

  return 'PC'
}
