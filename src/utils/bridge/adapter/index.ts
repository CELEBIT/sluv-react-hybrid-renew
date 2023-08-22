import { BridgeController } from '../controller'
import BridgeServiceManager from '../service/manager'

export const bridgeElementsCreator = () => {
  const bridgeServiceManager = new BridgeServiceManager()
  const bridgeController = new BridgeController(bridgeServiceManager)

  return {
    bridgeController,
    bridgeServiceManager,
  }
}

export const bridgeElements = bridgeElementsCreator()

export type BridgeProxyAdapterProps = {
  callback?: () => any
}

export const bridgeProxyAdapter = (props?: BridgeProxyAdapterProps) => {
  // android, ios 에서 동일한 인터페이스로 메세지를 전송해줄 수 있도록 설정
  window.sendToWebview = bridgeElements.bridgeController.receiveMessage

  return props?.callback?.()
}
