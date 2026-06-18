import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { AuthScreen } from './features/auth/presentation/pages/auth-screen'
import { SelectUser } from './features/select-user/presentation/page/select-user'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path="/auth" element={<AuthScreen />} />
          <Route path="/select-user" element={<SelectUser />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
