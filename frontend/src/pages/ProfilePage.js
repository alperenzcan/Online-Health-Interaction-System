import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getUserAppointment } from '../api/apiCalls';
import ProfileCard from '../components/ProfileCard';
import ScheduleProfile from '../components/ScheduleProfile';

const ProfilePage = () => {

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        loadAppointments();
    }, [])

    const { name, username, email } = useSelector((store) => ({
        username: store.username,
        name: store.name,
        email: store.email
    }));

    const loadAppointments = async () => {
        try {
            const res = await getUserAppointment(username)
            setAppointments(res.data);
        } catch (apiError) {
        }
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <ProfileCard name={name} username={username} email={email} />
                </div>
                <div className='col'>
                    <h3>Randevularım</h3>
                    {
                        appointments.length ? (
                            appointments.map(appointment => {
                                return <ScheduleProfile key={appointment.id} id={appointment.id} date={appointment.date} />
                            })
                        ) : <div></div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfilePage