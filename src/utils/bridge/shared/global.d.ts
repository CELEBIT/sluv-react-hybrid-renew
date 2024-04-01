import { BridgeMessage } from '../service'

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
    sendToWebview: (message: string) => void
  }
}

export const requestPhotoSelection = (totalPhotos: number, photosToSelect: number) => {
  if (typeof window !== 'undefined' && window.webkit) {
    window.webkit.postMessage(
      JSON.stringify({
        type: 'photoSelection',
        totalPhotos,
        photosToSelect,
      }),
    )
  } else {
    console.error('The app is not running in a WebView or server-side rendering is in process.')
  }
}
