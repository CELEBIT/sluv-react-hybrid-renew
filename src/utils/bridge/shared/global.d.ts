import { BridgeMessage } from '../service'

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
    setToken: (token: string) => void
    setUserStatus: (status: string) => void
  }
}
