import React, { useEffect, useState } from 'react'
import { contact } from '../api/apiCalls';

const ContactPage = () => {

  const [mailAddress, setMailAddress] = useState();
  const [message, setMessage] = useState();
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [resSuccess, setResSuccess] = useState()

  useEffect(() => {
    setResSuccess()
  },[mailAddress,message])

  const onClickContact = async event => {
    event.preventDefault();

    setPendingApiCall(true)

    const body = {
      mailAddress,
      message
    }

    try{
      const res = await contact(body);
      setPendingApiCall(false)
      setResSuccess(res.data.message)
    }catch(apiError){
      setPendingApiCall(false)
    }
  }

  return (
    <div className='container col-6'>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Mail adresiniz</label>
          <input type="email" className="form-control" id="exampleFormControlInput1" onChange={(event) => setMailAddress(event.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">Mesajınız</label>
          <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(event) => setMessage(event.target.value)}></textarea>
        </div>
        {resSuccess && <div className="alert alert-success" role="alert">{resSuccess}</div>}
        <button className='btn btn-primary' onClick={onClickContact} disabled={pendingApiCall}>{pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}Gönder</button>
      </form>
    </div>
  )
}

export default ContactPage