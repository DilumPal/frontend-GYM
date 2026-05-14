import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/login'
import HomePage from './pages/home'
import Header from './components/header'
import AdminPage from './pages/adminPage'
import TestPage from './pages/testPage'
import { Toaster } from 'react-hot-toast'
import RegisterPage from './pages/register'
import { GoogleOAuthProvider } from '@react-oauth/google';
import ForgetPasswordPage from './pages/forgetPassword'

function App() {
  
  return (
    <div>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
      <Toaster position='top-right'/>
      {/* <Header/> */}
        <Routes path="/">
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/forget" element={<ForgetPasswordPage/>}/>
          <Route path="/signup" element={<RegisterPage/>} />
          <Route path="testPage" element={<TestPage/>}/>
          <Route path="/adminPage*" element={<AdminPage/>} />
          <Route path="/*" element={<HomePage/>}/>
        </Routes>
      </BrowserRouter>
      </GoogleOAuthProvider>;
    </div>
  )
}

export default App

