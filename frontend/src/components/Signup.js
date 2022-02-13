import React, { useEffect, useState } from 'react'
import FloatingLabel from './FloatingLabel'

const Signup = ({ apiRequest, formTitle, buttonTitle, getDoctorList }) => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirm, setPasswordConfirm] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [validationErrors, setValidationErrors] = useState({})
    const [passwordMatch, setPasswordMatch] = useState()
    const [validationSuccess, setValidationSuccess] = useState();

    const [pendingApiCall, setPendingApiCall] = useState(false);

    useEffect(() => {
        setValidationErrors({})
        setValidationSuccess()
        if(password !== passwordConfirm){
            setPasswordMatch(false)
        }else{
            setPasswordMatch(true)
        }
    },[username, password, passwordConfirm, name, email])

    const onClickSignup = async event => {
        event.preventDefault();

        setPendingApiCall(true);

        const body = {
            username,
            password,
            name,
            email
        }

        try{
            const res = await apiRequest(body);
            setValidationSuccess(res.data.message)
            setPendingApiCall(false)
            getDoctorList();
        }catch(apiError){
            if(apiError.response.data.validationErrors){
                setValidationErrors(apiError.response.data.validationErrors);
            }
            setPendingApiCall(false);
        }
    }

    return (
        <div className='py-3'>
            <form>
                <h3 className='text-center'>{formTitle}</h3>
                <FloatingLabel id='username' type='text' labelText='Kullanıcı adı..' onChange={setUsername} apiError={validationErrors.username} />
                <FloatingLabel id='name' type='text' labelText='Ad soyad..' onChange={setName} apiError={validationErrors.name} />
                <FloatingLabel id='email' type='email' labelText='Mail adresi..' onChange={setEmail} apiError={validationErrors.email} />
                <FloatingLabel id='password' type='password' labelText='Şifre..' onChange={setPassword} apiError={validationErrors.password} />
                <FloatingLabel id='passwordConfirm' type='password' labelText='Şifre tekrarı..' onChange={setPasswordConfirm} />
                {!passwordMatch && <p className='text-danger'>* Şifre eşleşmiyor</p>}
                {validationSuccess && <div className="alert alert-success" role="alert">{validationSuccess}</div> }
                <button className='btn btn-primary' onClick={onClickSignup} disabled={pendingApiCall || !passwordMatch }>{pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}{buttonTitle}</button>
            </form>
        </div>
    )
}

export default Signup;