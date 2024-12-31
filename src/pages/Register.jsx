import React, { useEffect } from 'react';
import './styles/Register.css';
import RegisterCard from '../components/RegisterCard';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Register = () => {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn)
  const Navigate = useNavigate()
  useEffect(() => {
    if (isLoggedIn) {
      Navigate('/')
    }
  }, [isLoggedIn])
  return (
    <>
      <section className="registerPage">
        <RegisterCard />
      </section>
    </>
  );
};

export default Register;
