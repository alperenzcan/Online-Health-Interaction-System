import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { getAppointment } from '../api/apiCalls';
import DateTimeItem from './DateTimeItem'

const GetAppointmentItem = ({ date, id }) => {

    const {  username } = useSelector((store) => ({
        username:store.username,
    }));

    const [disableButton, setDisableButton] = useState(false);

    const onClickGetAppointment = async event => {
        //event.preventDefault();
        setDisableButton(true)
        try{
            const res = getAppointment(id,username)
        }catch(apiError){
        }
    }

    return (
        <div>
            <div className='row justify-content-between'>
                <div className='col'>
                    <DateTimeItem key={id} date={date} />
                </div>
                <div className='col col-auto'>
                    <button className='btn btn-secondary my-2' onClick={onClickGetAppointment} disabled={disableButton} >{disableButton ? "Randevu alındı" : "Randevu"}</button>
                </div>
            </div>
        </div>
    )
}

export default GetAppointmentItem