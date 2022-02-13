import React from 'react'

const FloatingLabel = ({ id, type, onChange, labelText, apiError }) => {
  return (
    <div className="form-floating m-3">
      <input className={apiError ? "form-control is-invalid" : "form-control"} placeholder="placeholder" id={id} type={type} autoComplete="off" onChange={(event) => onChange(event.target.value)}/>
      <label className="text-secondary" htmlFor={id}>{labelText}</label>
      <div className="invalid-feedback">{apiError}</div>
  </div>
  )
}

export default FloatingLabel