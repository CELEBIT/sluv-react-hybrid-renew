import { BridgeMessage } from '../service'

export const sendMessageToNative = (message: BridgeMessage<any>): void => {
  const serialized = JSON.stringify(message)

  if (window.AndroidBridge && window.AndroidBridge.sendToNative) {
    window.AndroidBridge.sendToNative(serialized)
  } else if (window.webkit.messageHandlers.IOSBridge) {
    window.webkit.messageHandlers.IOSBridge.sendToNative(serialized)
  } else {
    throw new Error('WebView interface is not available.')
  }
}
