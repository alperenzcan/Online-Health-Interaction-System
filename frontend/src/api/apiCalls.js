import axios from 'axios';

export const signupUser = (body) => {
    return axios.post('/api/users/user',body)
}

export const login = (creds) => {
    return axios.post('/api/auth', {}, {auth:creds})
}

export const signupDoctor = (body) => {
    return axios.post('/api/users/doctor',body)
}

export const getDoctors = () => {
    return axios.get('api/users/doctors');
}

export const getDoctorsOnly = () => {
    return axios.get('api/users/doctorsOnly');
}

export const deleteDoctor = (id) => {
    return axios.delete(`api/users/doctor?id=${id}`)
}

export const scheduleAppointment = (body) => {
    return axios.post('api/appointment',body)
}

export const doctorAppointments = (username) => {
    return axios.get(`api/appointment/doctorAppointment?username=${username}`);
}

export const deleteAppointment = (id) => {
    return axios.delete(`/api/appointment?id=${id}`);
}

export const getAppointment = (id,username) => {
    return axios.put(`/api/appointment?id=${id}&username=${username}`);
}

export const getDoctorsAvailableAppointments = (username) => {
    return axios.get(`/api/appointment/available/doctorAppointment?username=${username}`)
}

export const getAvailableTime = (body) => {
    return axios.post('api/appointment/availableTime',body)
}

export const getUserAppointment = (username) => {
    return axios.get(`api/appointment/userAppointments?username=${username}`)
}

export const cancel = (id) => {
    return axios.get(`api/appointment/cancel?id=${id}`);
}

export const contact = (body) => {
    return axios.post('api/users/contact',body);
}
