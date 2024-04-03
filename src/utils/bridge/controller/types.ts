// import { BridgeMessage, BridgeService } from '../service'
// import { ServiceList } from '../service/list'

// export type BridgeServices = typeof ServiceList
// export type BridgeServiceKeys = keyof BridgeServices

// export type BridgeServiceObserver<
//   TReqPayload = unknown,
//   TResPayload = unknown,
//   S extends BridgeService<TReqPayload, TResPayload> = BridgeService<TReqPayload, TResPayload>,
// > = (this: S, message?: BridgeMessage<TReqPayload | TResPayload>) => void

// export type RequestPayloadOf<S extends keyof BridgeServices> = Parameters<
//   BridgeServices[S]['requestMessage']
// >[1]
// export type ReceivePayloadOf<S extends keyof BridgeServices> = Parameters<
//   BridgeServices[S]['receiveMessage']
// >[1]

// export interface MappedObserver<S extends BridgeServiceKeys> {
//   code: string
//   observer: BridgeServiceObserver<RequestPayloadOf<S>, ReceivePayloadOf<S>>
//   service: BridgeServices[S]
// }
