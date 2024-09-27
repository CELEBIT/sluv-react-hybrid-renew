// 라이브러리/패키지
import { StrictMode, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RecoilRoot, useRecoilSnapshot } from 'recoil'
import { Global } from '@emotion/react'
// 상대 경로 파일
import App from './App'
import { Common, Pretendard, reset } from './components/styles'
import 'react-toastify/dist/ReactToastify.css'
import { HelmetProvider } from 'react-helmet-async'
import styled from '@emotion/styled'
import { ToastContainer } from 'react-toastify'

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

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 1000 * 15,
    },
  },
})
export const StyledToastContainer = styled(ToastContainer)`
  height: 100%;
  .Toastify__toast {
    text-align: center;
    width: 14.625rem;
    border-radius: 0.5rem;
    opacity: 0.8;
    background: ${Common.colors.BK};
    min-height: 2.3125rem;
    position: fixed; // 고정 위치로 설정
    top: 50%; // 화면의 세로 중앙
    left: 50%; // 화면의 가로 중앙
    transform: translate(-50%, -50%) !important; // 중앙으로 이동
    ${Pretendard({ size: 14, weight: Common.bold.regular, color: Common.colors.WH })}
  }
  .Toastify__toast-body {
    padding: 0;
    margin: 0;
  }
`

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen />
      <RecoilRoot>
        {/* <DebugObserver /> */}
        <Global styles={reset} />
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </RecoilRoot>
    </QueryClientProvider>
  </StrictMode>,
)
