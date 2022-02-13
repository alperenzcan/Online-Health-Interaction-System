import React, { useState } from 'react'
import { deleteDoctor } from '../api/apiCalls';
import ListItemRow from './ListItemRow'

const DoctorListItem = ({ id, name, username, email, getDoctorList }) => {

    const [pendingApiCall, setPendingApiCall] = useState(false)

    const onClickDelete = async event => {
        event.preventDefault();

        setPendingApiCall(true)

        try{
            const res = await deleteDoctor(id)
            getDoctorList();
            setPendingApiCall(false)
        }catch(apiError){
            setPendingApiCall(false)
        }
    }

    return (
        <div className='border p-3'>
            <ListItemRow title='ID' info={id} />
            <ListItemRow title='Ad Soyad' info={name} />
            <ListItemRow title='Kullanıcı Adı' info={username} />
            <ListItemRow title='Email' info={email} />
            <button className='btn btn-dark' onClick={onClickDelete} disabled={pendingApiCall}>Sil</button>
        </div>
    )
}

export default DoctorListItem