// 라이브러리/패키지 
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RecoilRoot } from 'recoil'
import { Global } from '@emotion/react'
// 상대 경로 파일 
import App from './App'
import { reset } from './components/styles'



const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen />
      <RecoilRoot>
        <Global styles={reset}/>
        <App />
      </RecoilRoot>
    </QueryClientProvider>
  </StrictMode>,
)


