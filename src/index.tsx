// 라이브러리/패키지
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RecoilRoot, useRecoilSnapshot } from 'recoil'
import { Global } from '@emotion/react'
// 상대 경로 파일
import App from './App'
import { reset } from './components/styles'

function DebugObserver() {
  const snapshot = useRecoilSnapshot()
  useEffect(() => {
    console.debug('The following atoms were modified:')
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.debug(node.key, snapshot.getLoadable(node))
    }
  }, [snapshot])

  return null
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 1000 * 60 * 60,
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    {/* <ReactQueryDevtools initialIsOpen /> */}
    <RecoilRoot>
      <DebugObserver />
      <Global styles={reset} />
      <App />
    </RecoilRoot>
  </QueryClientProvider>,
  // </StrictMode>,
)
