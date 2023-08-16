import testBridgeService from '../list/TestService'
import { ServiceList } from '../list'

class BridgeServiceManager {
  readonly bridgeServices = ServiceList
  readonly bridgeServiceKeys = Object.keys(ServiceList) as (keyof typeof ServiceList)[]

  getService<TReqPayload, TResPayload>(serviceName: keyof typeof this.bridgeServices) {
    return this.bridgeServices[serviceName]
  }

  getServiceKeys() {
    return this.bridgeServiceKeys
  }

  getServiceList() {
    return this.bridgeServices
  }
}

export const bridgeServiceManager = new BridgeServiceManager()
