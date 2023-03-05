import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import * as S from './components/styles';

// Pages
const Page404 = React.lazy(() => import('./pages/page404'));
const Page500 = React.lazy(() => import('./pages/page404'));

// Container 
const AppContent = React.lazy(() => import('./components/Content'));


const loading = <div>화면을 불러오는 중 입니다.(App)</div>

const App = () => {
  return (
    <S.Root>
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route path='/404' element={<Page404 />} />
            <Route path='/500' element={<Page500 />} />
            <Route path='/*' element={<AppContent />} />
          </Routes>
        </Suspense>
        {/* <Modals /> */}
      </BrowserRouter>
    </S.Root>
  )
}

export default App
