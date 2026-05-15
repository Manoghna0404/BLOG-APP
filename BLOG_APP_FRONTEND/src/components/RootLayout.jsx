import React, { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router'
import { useAuth } from '../store/authStore'

function RootLayout() {
  const checkAuth=useAuth(state=>state.checkAuth)
  const loading=useAuth(state=>state.loading)
  useEffect(()=>{
    checkAuth()
  },[])
  return (
    <div>
        <Header/>
        <div className='mx-20 min-h-screen'>
            <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default RootLayout