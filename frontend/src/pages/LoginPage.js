import React from 'react'
import Login from '../components/Login'
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className='container'>
        <Login />
        <p className="py-3 text-center">Kaydınız yok mu?<Link className="text-decoration-none" to='/signup'> Kayıt ol</Link></p>
    </div>
  )
}

export default LoginPage