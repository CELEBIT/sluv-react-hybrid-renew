import {
  BridgeMessage,
  BridgeMessageHeader,
  BridgeMessageType,
  BridgeServiceManager,
} from '../service'
import { generateRandomHash } from '../../hash'
import {
  BridgeServiceKeys,
  BridgeServiceObserver,
  BridgeServices,
  MappedObserver,
  ReceivePayloadOf,
  RequestPayloadOf,
} from './types'

export class BridgeController {
  private serviceManager = BridgeServiceManager
  private observers: MappedObserver<BridgeServiceKeys>[] = []

  public subscribe<S extends keyof BridgeServices>(
    serviceName: S,
    observer: BridgeServiceObserver<RequestPayloadOf<S>, ReceivePayloadOf<S>>,
  ) {
    const service = this.serviceManager.getService(serviceName)
    const ObserverCode = generateRandomHash()

    const mapped: MappedObserver<S> = {
      code: ObserverCode,
      observer: observer.bind(service),
      service,
    }

    this.observers.push(mapped)

    return {
      requestMessage: this.createRequestMessage(ObserverCode, service),
      unsubscribe: this.createObserverUnsubscriber(mapped),
    }
  }

  public receiveMessage<TPayload = unknown>(message: BridgeMessage<TPayload>) {
    // code에 따라 특정 서비스를 호출해서 해당 서비스의 receiveMessage를 실행해야 한다.
    this.observers.forEach((obs) => {
      if (obs.code === message.header.code) {
        obs.service.receiveMessage(message.header, message.payload)
      }
    })

    this.notify(message)
  }

  private createRequestMessage<S extends BridgeServiceKeys>(
    code: BridgeMessageHeader['code'],
    service: BridgeServices[S],
  ) {
    return (type: BridgeMessageType, payload: RequestPayloadOf<S>) => {
      const header: BridgeMessageHeader = {
        type,
        code,
      }

      service.requestMessage(header, payload)
    }
  }

  private createObserverUnsubscriber = (obs: MappedObserver<BridgeServiceKeys>) => {
    return () => {
      const targetIndex = this.observers.indexOf(obs)
      this.observers = this.observers.filter((obs, idx) => idx !== targetIndex)
    }
  }

  private notify = <TPayload = unknown>(message: BridgeMessage<TPayload>) => {
    this.observers.forEach((obs) => {
      if (obs.code === message.header.code) {
        obs.observer.call(obs.service)
      }
    })
  }
}

const bridgeController = new BridgeController()

// android, ios 에서 동일한 인터페이스로 메세지를 전송해줄 수 있도록 설정
window.AndroidBridge.sendToWebview = bridgeController.receiveMessage
window.webkit.messageHandlers.IOSBridge.sendToWebview = bridgeController.receiveMessage

export default bridgeController
