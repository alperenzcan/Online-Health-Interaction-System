import React from 'react'

const ProfileCard = ({ username, name, email }) => {

  return (
    <div>
        <h3>Kullanıcı Bilgileri</h3>
        <div className='row'>
            <div className='col'><p>Kullanıcı Adı:</p></div>
            <div className='col'>{username}</div>
        </div>
        <div className='row'>
            <div className='col'><p>Ad Soyad:</p></div>
            <div className='col'>{name}</div>
        </div>
        <div className='row'>
            <div className='col'><p>Email:</p></div>
            <div className='col'>{email}</div>
        </div>
    </div>
  )
}

export default ProfileCard