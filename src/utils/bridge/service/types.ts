import { sendMessageToNative } from '../shared'

export type BridgeMessageType = 'Permission' | 'Normal'

export type BridgeMessageHeader = {
  type: BridgeMessageType
  code: string
}
export type BridgeMessagePayload<T = unknown> = T

export interface BridgeMessage<TPayload> {
  header: BridgeMessageHeader
  payload: BridgeMessagePayload<TPayload>
}

export type BridgeTransactionFunction<TPayload> = (
  header: BridgeMessageHeader,
  payload: BridgeMessagePayload<TPayload>,
) => void

export interface BridgeService<TRequestPayload = unknown, TReceivePayload = unknown> {
  requestMessage: BridgeTransactionFunction<TRequestPayload>
  receiveMessage: BridgeTransactionFunction<TReceivePayload>
}

export abstract class BridgeServiceAbstraction<RequestPayload, ReceivePayload>
  implements BridgeService<RequestPayload, ReceivePayload>
{
  requestMessage(header: BridgeMessageHeader, payload: BridgeMessagePayload<RequestPayload>): void {
    const message = this.createMessage(header, payload)
    sendMessageToNative(message)
  }

  abstract createMessage(
    header: BridgeMessageHeader,
    payload: BridgeMessagePayload<RequestPayload>,
  ): BridgeMessage<RequestPayload>

  abstract receiveMessage(
    header: BridgeMessageHeader,
    payload: BridgeMessagePayload<ReceivePayload>,
  ): void
}
