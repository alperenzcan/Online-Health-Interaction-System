import React from 'react'

const DropdownItem = ({ username, name, setDoctorUsername, setDoctorName }) => {

  return (
    <li><a className="dropdown-item" style={{ cursor: 'pointer' }} onClick={() => {
      setDoctorUsername(username);
      setDoctorName(name);
    }}>{name}</a></li>
  )
}

export default DropdownItem