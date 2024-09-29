// import { BridgeMessage } from '../service'

// export const sendMessageToNative = (message: BridgeMessage<any>): void => {
//   const serialized = JSON.stringify(message)
//   console.log(message)
//   if (window.AndroidBridge && window.AndroidBridge.sendToNative) {
//     window.AndroidBridge.sendToNative(serialized)
//   } else if (window.webkit.messageHandlers.IOSBridge) {
//     window.webkit.messageHandlers.IOSBridge.postMessage(serialized)
//   } else {
//     throw new Error('WebView interface is not available.')
//   }
// }
