import React, { useEffect, useState } from 'react'
import { deleteAppointment } from '../api/apiCalls'
import DateTimeItem from './DateTimeItem'
import ListItemRow from './ListItemRow'

const ScheduleAppointmentListItem = ({ id, date, getterAppUserVM, loadAppointmentList }) => {

    const [pendingApiCall, setPendingApiCall] = useState(false);

    const onClickDelete = async () => {

        setPendingApiCall(true)

        try {
            const res = await deleteAppointment(id)
            loadAppointmentList();
            setPendingApiCall(false)
        } catch (apiError) {
            setPendingApiCall(false)
        }
    }

    return (
        <div className='border my-3 p-2'>
            <div className='row'>
                <div className='col'>
                    <DateTimeItem date={date} />
                    {getterAppUserVM && <ListItemRow title='Hastanın Adı' info={getterAppUserVM.username} />}

                </div>
                <div className='col col-auto'>
                    <button className='btn btn-dark' onClick={onClickDelete} disabled={pendingApiCall}>Sil</button>
                </div>
            </div>
        </div>
    )
}

export default ScheduleAppointmentListItem