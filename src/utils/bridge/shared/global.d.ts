import { BridgeMessage } from '../service'

declare global {
  interface Window {
    AndroidBridge: {
      sendToNative: (message: string) => void
    }
    webkit: {
      messageHandlers: {
        IOSBridge: {
          sendToNative: (message: string) => void
        }
      }
    }
    sendToWebview: (message: string) => void
  }
}
