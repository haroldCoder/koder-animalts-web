import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { AuthScreen } from './features/auth/presentation/pages/auth-screen'
import { SelectUser } from './features/select-user/presentation/page/select-user'
import { Home } from './features/home/presentation/pages/home'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path="/auth" element={<AuthScreen />} />
          <Route path="/select-user" element={<SelectUser />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
