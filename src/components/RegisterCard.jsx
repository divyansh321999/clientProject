import React, { useState } from 'react';
import './styles/RegisterCard.css';
import { useDispatch } from 'react-redux';
import { setNotification } from '../redux/notifySlice';
import { setIsLoggedIn } from '../redux/userSlice';

const RegisterCard = () => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      if(formData.password === formData.confirmPassword){
        const res = await fetch('/api/user/register', {
          method: 'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify(formData)
        })
        const data = await res.json()
        if(res.ok){
          dispatch(setNotification(data.message))
          dispatch(setIsLoggedIn(true))
        }else{
          dispatch(setNotification(data.message))
        }
      } else {
        dispatch(setNotification('Password Miss Matched'))
      }
    } catch (error) {
      
    }
  };

  return (
    <>
      <div className="registerWrapper">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Enter your Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <input type="submit" value="Register" />
        </form>
      </div>
    </>
  );
};

export default RegisterCard;
