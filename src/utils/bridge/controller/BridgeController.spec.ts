import BridgeController from './index'
import BridgeServiceManager from '../service/manager'

const initBridgeController = () => {
  return new BridgeController(new BridgeServiceManager())
}

jest.mock('../service/manager')

const TEST_SUBSCRIBER = () => {
  return 'test'
}

describe('Bridge Controller', () => {
  describe('subscribe 호출 시', () => {
    it('unsubscribe, requestMessage 함수가 반환된다.', () => {
      const bridgeController = initBridgeController()

      const { unsubscribe, requestMessage } = bridgeController.subscribe(
        'testBridgeService',
        TEST_SUBSCRIBER,
      )

      expect(unsubscribe).not.toBe(undefined || null)
      expect(requestMessage).not.toBe(undefined || null)
    })
  })

  it('bridgeController observer에 등록된다.', () => {
    const bridgeController = initBridgeController()

    bridgeController.subscribe('testBridgeService', TEST_SUBSCRIBER)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(bridgeController.observers.some((value) => value.observer === TEST_SUBSCRIBER))
  })
})
