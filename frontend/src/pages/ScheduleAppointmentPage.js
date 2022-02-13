import React, { useEffect, useState } from 'react'
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import '../App.css'
import { useSelector } from 'react-redux';
import { doctorAppointments, scheduleAppointment } from '../api/apiCalls';
import ScheduleAppointmentListItem from '../components/ScheduleAppointmentListItem';

const ScheduleAppointmentPage = () => {

    const [date, setDate] = useState();
    const [appointmentList, setAppointmentList] = useState([]);
    const [scheduleSuccess, setScheduleSuccess] = useState();
    const [error, setError] = useState();
    const [pendingApiCall, setPendingApiCall] = useState(false)

    const { username } = useSelector((store) => ({
        username: store.username
    }));

    useEffect(() => {
        setScheduleSuccess();
        setError();
    }, [date])

    useEffect(() => {
        loadAppointmentList();
    }, [])

    const onClickSchedule = async event => {
        event.preventDefault();

        const body = {
            date,
            username
        }

        try {
            const res = await scheduleAppointment(body);
            setScheduleSuccess(res.data.message)
            loadAppointmentList();
        } catch (apiError) {
            setError(apiError.response.data.message)
        }
    }

    const loadAppointmentList = async () => {

        setPendingApiCall(true)

        try {
            const res = await doctorAppointments(username);
            setAppointmentList(res.data)
            setPendingApiCall(false)
        } catch (apiError) {
            setPendingApiCall(false)
        }
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-lg-4 border-end sticky-top bg-light py-3'>
                    <div className='sticky-top py-3'>
                        <DateTimePickerComponent onChange={(event) => setDate(event.target.value)} placeholder='Tarih ve saat seçiniz' ></DateTimePickerComponent>
                        {scheduleSuccess && <div className="alert alert-success" role="alert">{scheduleSuccess}</div>}
                        {error && <div className="alert alert-danger" role="alert">{error}</div>}
                        <button className='btn btn-primary' onClick={onClickSchedule}>Randevu Oluştur</button>
                    </div>

                </div>
                <div className='col-lg-8 py-3'>
                    <h3>Hasta Randevuları</h3>
                    {
                        !pendingApiCall &&
                            appointmentList.length ? (
                            appointmentList.map(appointment => {
                                return <ScheduleAppointmentListItem key={appointment.id} id={appointment.id} date={appointment.date} getterAppUserVM={appointment.getterAppUserVM} loadAppointmentList={loadAppointmentList} />
                            })
                        ) : !pendingApiCall && <div>Randevu mevcut değil</div>
                    }
                    {
                        pendingApiCall && <div>Yükleniyor</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ScheduleAppointmentPage