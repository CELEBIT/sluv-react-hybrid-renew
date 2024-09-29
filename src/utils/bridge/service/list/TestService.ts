// import {
//   BridgeMessage,
//   BridgeMessageHeader,
//   BridgeMessagePayload,
//   BridgeServiceAbstraction,
// } from '../types'

// type TestServiceRequestPayload = { req: string }
// type TestServiceResponsePayload = { res: string }
// class TestBridgeService extends BridgeServiceAbstraction<
//   TestServiceRequestPayload,
//   TestServiceResponsePayload
// > {
//   receiveMessage(
//     header: BridgeMessageHeader,
//     payload: BridgeMessagePayload<TestServiceResponsePayload>,
//   ): void {
//     console.log('receive')
//     console.log(header, payload)
//   }

//   createMessage(
//     header: BridgeMessageHeader,
//     payload: BridgeMessagePayload<TestServiceRequestPayload>,
//   ): BridgeMessage<TestServiceRequestPayload> {
//     return { header, payload }
//   }
// }

// export default new TestBridgeService()
