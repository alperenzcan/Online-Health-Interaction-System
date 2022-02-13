import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/apiCalls';
import { loginSuccess } from '../redux/authActions';
import FloatingLabel from './FloatingLabel';

const Login = () => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState()

    const [pendingApiCall, setPendingApiCall] = useState(false);

    const dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(() => {
        setError()
    },[username, password])

    const onClickLogin = async event => {
        event.preventDefault();

        setPendingApiCall(true);

        const creds = {
            username,
            password
        }

        try{
            const res = await login(creds);
            setPendingApiCall(false);
            const authState = {
                ...res.data,
                password
            }
            dispatch(loginSuccess(authState))
            navigate('/')
           //console.log(res)
        }catch(apiError){
            setError(apiError.response.data.message)
            setPendingApiCall(false);
        }
    }


  return (
    <div>
        <div className='container col-lg-6'>
            <form>
                <h3 className='text-center'>Giriş</h3>
                <FloatingLabel id='username' type='text' labelText='Kullanıcı adı..' onChange={setUsername} />
                <FloatingLabel id='password' type='password' labelText='Şifre..' onChange={setPassword} />
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <button className='btn btn-primary' onClick={onClickLogin}  disabled={pendingApiCall}>{pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}Giriş</button>
            </form>
        </div>
    </div>
  )
}

export default Login