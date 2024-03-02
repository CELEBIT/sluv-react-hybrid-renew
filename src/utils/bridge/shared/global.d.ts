import { BridgeMessage } from '../service'

export interface Token {
  token: string
}
export interface UserStatus {
  status: string
}

declare global {
  interface Window {
    AndroidBridge: {
      sendToNative: (message: string) => void
    }
    webkit: {
      messageHandlers: {
        IOSBridge: any
        // {
        //   sendToNative: (message: string) => void
        // }
      }
    }
    sendToWebview: (message: string) => void
    setToken: (tokenData: Token) => void
    setUserStatus: (statusData: UserStatus) => void
  }
}
