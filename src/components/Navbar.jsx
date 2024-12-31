import React, { useEffect } from 'react'
import './styles/Navbar.css'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../redux/notifySlice';
import { checkUserLoggedIn, logoutUser } from '../redux/userSlice';

const Navbar = () => {
    const notification = useSelector(state => state.notification.value)
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(checkUserLoggedIn())
    }, [])
    useEffect(() => {
        if (notification !== '') {
            toast(notification)
            setTimeout(() => {
                dispatch(setNotification(''))
            }, 3000);
        }
    }, [notification])
    const handleLogout = async () => {
        try {
            dispatch(logoutUser());
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <>
            <nav className="navbar">
                <section className="leftNav">
                    <h1>ToDo List</h1>
                </section>
                <section className="rightNav">
                    <ul className="navlist">
                        <li className='listitem'><Link to='/'>Home</Link></li>
                        {!isLoggedIn && <>
                            <li className='listitem authBtn'><Link to='/login'>Login</Link></li>
                            <li className='listitem authBtn'><Link to='/register'>Register</Link></li>
                        </>}
                        {isLoggedIn && <li className='listitem authBtn' onClick={handleLogout}>Logout</li>}
                    </ul>
                </section>
            </nav>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    )
}

export default Navbar