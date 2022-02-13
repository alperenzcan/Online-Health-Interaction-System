import React, { useEffect, useState } from 'react'
import Signup from '../components/Signup'
import { getDoctorsOnly, signupDoctor } from '../api/apiCalls'
import DoctorListItem from '../components/DoctorListItem'

const DoctorSignupPage = () => {

    const [doctors, setDoctors] = useState([]);
    const [pendingApiCall, setPendingApiCall] = useState(false)

    useEffect(async () => {
        getDoctorList();
    },[])

    const getDoctorList = async event =>{
        //event.preventDefault();

        setPendingApiCall(true)

        try{
            const res = await getDoctorsOnly();
            setDoctors(res.data)
            setPendingApiCall(false)
        }catch(apiError){
            setPendingApiCall(false)
        }
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-lg-6 border-end bg-light'>
                    <Signup apiRequest={signupDoctor} formTitle='Doktor Kaydı' buttonTitle='Kayıt Et' getDoctorList={getDoctorList} />
                </div>
                <div className='py-3 col-lg-6'>
                    <h3>Kayıtlı Doktorlar</h3>
                    {
                        !pendingApiCall && 
                           doctors.length ? (
                            doctors.map(doctor => {
                                return <DoctorListItem key={doctor.id} id={doctor.id} name={doctor.name} username={doctor.username} email={doctor.email } getDoctorList={getDoctorList} />
                            })
                        ) : !pendingApiCall && <div>Doktor mevcut değil</div>
                    }
                    {
                        pendingApiCall && <div>Yükleniyor</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default DoctorSignupPage