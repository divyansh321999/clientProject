import React, {  useState } from 'react'
import './styles/LoginCard.css'
import { useDispatch } from 'react-redux'
import { setNotification } from '../redux/notifySlice'
import { checkUserLoggedIn } from '../redux/userSlice'
const LoginCard = () => {
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        let {name, value} = e.target;
        setForm({
            ...form,
            [name]:value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {   
            const res = await fetch('/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(form)
            })            
            const data = await res.json()
            if(res.ok){
                dispatch(setNotification(data.message))
                dispatch(checkUserLoggedIn())
            } else{
                dispatch(setNotification(data.message))
            }
        } catch (error) {
            console.log(error);
            alert(error.message)
        }
    }

  return (
    <>
        <div className="loginWrapper">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name='email' value={form.email} onChange={handleChange} placeholder='Enter your Email' required/>
                <input type="password" name='password' value={form.password} onChange={handleChange} placeholder='Enter your Password' required/>
                <input type="submit" value="Login" />
            </form>
        </div>
    </>
  )
}

export default LoginCard