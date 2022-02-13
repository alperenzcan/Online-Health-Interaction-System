import React, { useEffect, useState } from 'react'

const DateTimeItem = ({ date }) => {

    let dateTime = new Date(date).toString().substring(0, 24)

    return (
        <div className='row'>
            <div className='col-4'>
                <p className='fw-bold'>Randevu Tarihi:</p>
            </div>
            <div className='col-8'>
                {dateTime}
            </div>
        </div>
    )
}

export default DateTimeItem