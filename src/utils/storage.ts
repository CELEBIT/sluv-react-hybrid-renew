class Storage {
  cache: Map<string, any>

  constructor() {
    this.cache = new Map<string, any>()
  }

  set(key: string, value: any): void {
    this.cache.set(key, value)
    window.localStorage.setItem(key, value)
  }

  get(key: string, initialValue?: string) {
    try {
      return this.cache.get(key) || window.localStorage.getItem(key) || initialValue
    } catch (err) {
      return initialValue
    }
  }

  clear(): void {
    window.localStorage.clear()
    this.cache.clear()
  }

  remove(key: string): boolean {
    window.localStorage.removeItem(key)
    return this.cache.delete(key)
  }

  tokenSet(
    accessToken: string,
    // accessTokenAge: number,
    // refreshToken: string,
    // refreshTokenAge: number,
  ) {
    this.set('accessToken', accessToken)
    // this.set('accessTokenAge', String(accessTokenAge))
    // this.set('refreshToken', refreshToken)
    // this.set('refreshTokenAge', String(refreshTokenAge))
  }

  tokenRemove() {
    this.remove('accessToken')
    // this.remove('accessTokenAge')
    // this.remove('refreshToken')
    // this.remove('refreshTokenAge')
  }

  userStatusSet(userStatus: string) {
    this.set('userStatus', userStatus)
  }
}

const storage = new Storage()

export default storage
