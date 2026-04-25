import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/login'
import HomePage from './pages/home'
import Header from './components/header'
import AdminPage from './pages/adminPage'
import TestPage from './pages/testPage'
import { Toaster } from 'react-hot-toast'
import RegisterPage from './pages/register'

function App() {
  
  return (
    <div>
      <BrowserRouter>
      <Toaster position='top-right'/>
      {/* <Header/> */}
        <Routes path="/">
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<RegisterPage/>} />
          <Route path="testPage" element={<TestPage/>}/>
          <Route path="/adminPage*" element={<AdminPage/>} />
          <Route path="/*" element={<h1>404 not found</h1>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

//https://tgjwaeillwyegfbedncz.supabase.co/rest/v1/
//sb_publishable_JVa5CScXg6670BEjzYK4zw_yzL_uM8-