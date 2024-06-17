// import { BridgeMessage } from '../service'

export interface Token {
  token: string
}
export interface UserStatus {
  status: string
}

// declare global {
//   interface Window {
//     AndroidBridge: {
//       sendToNative: (message: string) => void
//     }
//     webkit: {
//       messageHandlers: {
//         IOSBridge: {
//           sendToNative: (message: any) => void
//         }
//       }
//     }
//     sendToWebview: (message: string) => void
//   }
// }

// TypeScript: window 객체 확장
declare global {
  interface Window {
    AndroidBridge: {
      sendToNative: (message: string) => void
    }
    webkit: {
      messageHandlers: {
        IOSBridge: {
          postMessage: (msg: any) => void
        }
      }
    }
    ReactNativeWebView: {
      postMessage: (msg: any) => void
    }
    sendToWebview: (message: string) => void
  }
}
