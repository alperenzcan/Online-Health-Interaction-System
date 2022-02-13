import React, { useEffect, useState } from 'react'
import { getAvailableTime, getDoctors, getDoctorsAvailableAppointments } from '../api/apiCalls';
import DropdownItem from '../components/DropdownItem';
import GetAppointmentItem from '../components/GetAppointmentItem';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import '../App.css';

const GetAppointmentPage = () => {

  const [doctorList, setDoctorList] = useState([]);
  const [doctorUsername, setDoctorUsername] = useState();
  const [doctorName, setDoctorName] = useState();
  const [appointments, setAppointments] = useState([]);
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const [appointmentsTime, setAppointmentsTime] = useState([]);

  useEffect(async () => {
    loadDoctors();
    getAvailableAppointment();

  }, [doctorUsername])

  const loadDoctors = async event => {
    //event.preventDefault();
    try {
      const res = await getDoctors();
      setDoctorList(res.data)
    } catch (apiError) {

    }
  }

  const getAvailableAppointment = async event => {

    try {
      const res = await getDoctorsAvailableAppointments(doctorUsername);
      setAppointments(res.data)
    } catch (apiError) {

    }
  }

  const onSelectDates = args => {
    setMin(args.startDate)
    setMax(args.endDate)
  }

  const onClickSearchByDate = async () => {

    const body = {
      min: min,
      max: max
    }

    try {
      const res = await getAvailableTime(body);
      setAppointmentsTime(res.data)
    } catch (apiError) {

    }
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-lg-6 my-2 border-end'>
          <h5 className='text-center'>Doktor Seçimi İle</h5>
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle w-100" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown">
              Doktor Seçiniz
            </button>
            <ul className="dropdown-menu w-100">
              {
                doctorList.length ? (
                  doctorList.map(doctor => {
                    return <DropdownItem key={doctor.id} username={doctor.username} name={doctor.name} setDoctorUsername={setDoctorUsername} setDoctorName={setDoctorName} />
                  })
                ) : <div>Doktor Yok</div>
              }
            </ul>
          </div>
          <h6 className='my-3'>Seçilen Doktor : {doctorName}</h6>
          {
            appointments.length ? (
              appointments.map(appointment => {
                return <div className='border m-2'> <GetAppointmentItem key={appointment.id} id={appointment.id} date={appointment.date} /></div>
              })
            ) : <div>Uygun randevu yok</div>
          }
        </div>

        <div className='col-lg-6 my-2 border-start'>
          <h5 className='text-center'>Tarih Seçimi İle</h5>
          <DateRangePickerComponent delayUpdate={true} change={onSelectDates} placeholder='Tarih seçiniz' />
          <button className='btn btn-secondary' onClick={onClickSearchByDate}>Ara</button>
          {
            appointmentsTime.length ? (
              appointmentsTime.map(appointment => {
                return <div className='border m-2'> <GetAppointmentItem key={appointment.id} id={appointment.id} date={appointment.date} /></div>
              })
            ) : <div>Uygun randevu yok</div>
          }
        </div>
      </div>
    </div>
  )
}

export default GetAppointmentPage