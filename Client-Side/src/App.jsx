import React from 'react'
import Home from './pages/home'
import Student from './pages/student'
import Teacher from './pages/teacher'
import Dashboard from './pages/dashboard'
import Chat from './pages/chat'
import Login from './pages/login'
import Register from './pages/register'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/layout'
import { AuthProvider } from './context/AuthContext'

const App = () => {
  return <>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="student" element={<Student />} />
            <Route path="teacher" element={<Teacher />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="chat" element={<Chat />} />
            <Route path="login" element={<Login />} />
            <Route path="Register" element={<Register />} />

          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </>

}

export default App