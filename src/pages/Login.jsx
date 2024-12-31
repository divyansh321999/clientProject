import React, { useEffect } from 'react'
import './styles/Login.css'
import LoginCard from '../components/LoginCard'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Login = () => {

  const isLoggedIn = useSelector(state => state.user.isLoggedIn)
    const Navigate = useNavigate()
  useEffect(() => {
    if (isLoggedIn) {
      Navigate('/')
    }
  }, [isLoggedIn])
  return (
    <>
      <section className="loginPage">
        <LoginCard />
      </section>
    </>
  )
}

export default Login