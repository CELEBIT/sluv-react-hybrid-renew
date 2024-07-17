// 라이브러리/패키지
import React, { useEffect } from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RecoilRoot, useRecoilSnapshot } from 'recoil'
import { Global } from '@emotion/react'
// 상대 경로 파일
import App from './App'
import { Common, Pretendard, reset } from './components/styles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styled from '@emotion/styled'
import { HelmetProvider } from 'react-helmet-async'

function DebugObserver() {
  const snapshot = useRecoilSnapshot()
  useEffect(() => {
    // console.debug('The following atoms were modified:')
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
export const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    text-align: center;
    width: 14.625rem;
    border-radius: 0.5rem;
    opacity: 0.8;
    background: ${Common.colors.BK};
    min-height: 2.3125rem;
    /* max-width: 14.6875rem; */
    left: 50% !important;
    bottom: 50vh !important;
    transform: translateX(-50%) !important;
    ${Pretendard({ size: 14, weight: Common.bold.regular, color: Common.colors.WH })}
  }
  .Toastify__toast-body {
    padding: 0;
    margin: 0;
  }
`
const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)
// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
if (document.getElementById('root')?.hasChildNodes()) {
  ReactDOM.hydrateRoot(
    container,
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen /> */}
      <RecoilRoot>
        {/* <DebugObserver /> */}
        <Global styles={reset} />
        <StyledToastContainer
          position='bottom-center'
          autoClose={1500}
          hideProgressBar={true}
          closeButton={false}
          closeOnClick={false}
          pauseOnHover={false}
          limit={1}
        />
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </RecoilRoot>
    </QueryClientProvider>,
  )
} else {
  root.render(
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen /> */}
      <RecoilRoot>
        {/* <DebugObserver /> */}
        <Global styles={reset} />
        <StyledToastContainer
          position='bottom-center'
          autoClose={1500}
          hideProgressBar={true}
          closeButton={false}
          closeOnClick={false}
          pauseOnHover={false}
          limit={1}
        />
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </RecoilRoot>
    </QueryClientProvider>,
  )
}
