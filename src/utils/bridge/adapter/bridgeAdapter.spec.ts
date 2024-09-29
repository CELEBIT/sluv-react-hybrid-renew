// import { bridgeElementsCreator, bridgeProxyAdapter } from './index'

// const initializeBridgeController = () => {
//   const { bridgeController, bridgeServiceManager } = bridgeElementsCreator()
//   bridgeProxyAdapter()

//   return { bridgeController, bridgeServiceManager }
// }

// describe('On Application Mount', () => {
//   describe('bridgeElementCreator', () => {
//     it('bridgeElementCreator는 Bridge 구성 요소를 생성한다', () => {
//       const { bridgeController, bridgeServiceManager } = initializeBridgeController()

//       expect(bridgeController).toBeDefined()
//       expect(bridgeServiceManager).toBeDefined()
//     })
//   })

//   describe('BridgeProxyAdapter', () => {
//     it('bridgeAdapter는 전역객체에 bridgeController를 바인딩한다.', () => {
//       const { bridgeController } = initializeBridgeController()
//       expect(window.sendToWebview).toBe(bridgeController.receiveMessage)
//     })
//   })
// })
