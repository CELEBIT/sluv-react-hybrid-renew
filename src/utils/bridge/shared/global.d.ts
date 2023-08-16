import { BridgeMessage } from '../service'

declare global {
  interface Window {
    AndroidBridge: {
      sendToNative: (message: string) => void
      sendToWebview: (message: BridgeMessage<any>) => void
    }
    webkit: {
      messageHandlers: {
        IOSBridge: {
          sendToNative: (message: string) => void
          sendToWebview: (message: BridgeMessage<any>) => void
        }
      }
    }
  }
}
