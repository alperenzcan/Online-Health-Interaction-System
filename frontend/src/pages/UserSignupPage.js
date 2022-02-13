import React from 'react'
import Signup from '../components/Signup'
import { signupUser } from '../api/apiCalls'

const UserSignupPage = () => {

  return (
    <div className='container col-lg-6'>
        <Signup apiRequest={signupUser} formTitle='Kayıt Ol' buttonTitle='Kayıt Ol' />
    </div>
  )
}

export default UserSignupPage