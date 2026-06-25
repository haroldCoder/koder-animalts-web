import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { AuthScreen } from './features/auth/presentation/pages/auth-screen'
import { SelectUser } from './features/select-user/presentation/page/select-user'
import Home from './home'
import ProtectedRoute from './protected-route'
import { RootRedirect } from './root-redirect'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/Auth" element={<AuthScreen />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/select-user" element={<SelectUser />} />
            <Route path="/home/*" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
