import { lazy, LazyExoticComponent } from 'react'

export const retryLazy = <T extends React.ComponentType<any>>(
  componentImport: () => Promise<{ default: T }>,
): LazyExoticComponent<T> =>
  lazy(async () => {
    const pageAlreadyRefreshed = JSON.parse(window.localStorage.getItem('pageRefreshed') || 'false')
    try {
      const component = await componentImport()
      window.localStorage.setItem('pageRefreshed', 'false')
      return component
    } catch (error) {
      if (!pageAlreadyRefreshed) {
        window.localStorage.setItem('pageRefreshed', 'true')
        window.location.reload()
      }
      throw error
    }
  })
